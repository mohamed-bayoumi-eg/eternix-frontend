import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TableColumn, MetaData } from '../../../models/base-requests';
import { DynamicInputConfig, FieldType } from '../../../models/dynamic-input-config';
import { DynamicListPageConfig } from '../../../models/dynamic-page-config';
import { DynamicTableComponent } from '../../dynamic-components/dynamic-table-component/dynamic-table-component';
import { DynamicInputComponent } from '../dynamic-input-component/dynamic-input-component';
import { ConfirmDialogComponent } from '../../ui-components/confirm-dialog-component/confirm-dialog-component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dynamic-list-page-component',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    DynamicTableComponent,
    DynamicInputComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './dynamic-list-page-component.html',
  styleUrl: './dynamic-list-page-component.scss',
})
export class DynamicListPageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  @Input({ required: true }) columns: TableColumn[] = [];
  @Input() items: any[] = [];
  @Input() metaData: MetaData | null = null;
  @Input() isLoading = false;
  @Input() query: any = null;
  @Input() filterConfigs: DynamicInputConfig[] = [];

  @Input({ required: true }) config!: DynamicListPageConfig;

  @Output() onFilterChange = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onSearch = new EventEmitter<string>();
  @Output() onSort = new EventEmitter<string>();
  @Output() onPageChange = new EventEmitter<number>();
  @Output() onPageSizeChange = new EventEmitter<number>();
  @Output() onBulkDelete = new EventEmitter<string[]>();

  filterForm = new FormGroup({});
  selectedIds: string[] = [];
  selectedIdToDelete: string | null = null;
  showConfirmDialog = false;
  showBulkConfirm = false;

  searchConfig: DynamicInputConfig = {
    type: FieldType.Text,
    fieldName: 'searchTerm',
    label: 'search',
    showErrorMessage: false,
  };

  ngOnInit() {
    this.applyPermissionsFromRoute();
    this.initFilterForm();
  }
  private applyPermissionsFromRoute() {
    const screenKey = this.route.snapshot.data['screenKey'];

    if (screenKey) {
      this.config = {
        ...this.config,
        title: screenKey,
        showSearch: this.config.showSearch ?? true,
        showAddBtn: this.authService.hasPermission(screenKey, 'Create'),
        showEditBtn: this.authService.hasPermission(screenKey, 'Update'),
        showDeleteBtn: this.authService.hasPermission(screenKey, 'Delete'),
      };
    } else {
      console.warn('ScreenKey not found in route data!');
    }
  }
  private initFilterForm() {
    this.filterForm.addControl(this.searchConfig.fieldName, new FormControl(null));

    this.filterConfigs?.forEach((cfg) => {
      this.filterForm.addControl(cfg.fieldName, new FormControl(null));
    });

    this.filterForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged((p, c) => JSON.stringify(p) === JSON.stringify(c)),
      )
      .subscribe((values) => this.onFilterChange.emit(values));
  }
  handleAddClick() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
  handleEditClick(item: any) {
    this.router.navigate(['edit', item.id], { relativeTo: this.route });
  }
  handleDeleteClick(id: string) {
    this.selectedIdToDelete = id;
    this.showConfirmDialog = true;
  }

  handleDialogResult(result: boolean) {
    if (result && this.selectedIdToDelete) {
      this.onDelete.emit(this.selectedIdToDelete);
    }
    this.showConfirmDialog = false;
    this.selectedIdToDelete = null;
  }

  handleBulkDelete(ids: string[]) {
    this.selectedIds = ids;
    this.showBulkConfirm = true;
  }

  handleBulkResult(result: boolean) {
    if (result && this.selectedIds.length) {
      this.onBulkDelete.emit(this.selectedIds);
    }
    this.showBulkConfirm = false;
    this.selectedIds = [];
  }
}
