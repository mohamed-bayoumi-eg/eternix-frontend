import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableColumn, MetaData } from '../../../models/base-requests';
import { DynamicTableComponent } from '../../dynamic-components/dynamic-table-component/dynamic-table-component';
import { DynamicInputConfig } from '../../../models/dynamic-input-config';
import { DynamicPageConfig } from '../../../models/dynamic-page-config';
import { DynamicInputComponent } from '../dynamic-input-component/dynamic-input-component';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmDialogComponent } from '../../ui-components/confirm-dialog-component/confirm-dialog-component';

@Component({
  selector: 'app-dynamic-list-page-component',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    DynamicTableComponent,
    DynamicInputComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './dynamic-list-page-component.html',
  styleUrl: './dynamic-list-page-component.scss',
})
export class DynamicListPageComponent {
  @Input({ required: true }) columns: TableColumn[] = [];
  @Input() items: any[] = [];
  @Input() metaData: MetaData | null = null;
  @Input() isLoading: boolean = false;
  @Input() query: any = null;
  @Input() filterConfigs: DynamicInputConfig[] = [];

  @Output() onPageSizeChange = new EventEmitter<number>();
  @Output() onFilterChange = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onSearch = new EventEmitter<string>();
  @Output() onSort = new EventEmitter<string>();
  @Output() onPageChange = new EventEmitter<number>();

  private _config!: DynamicPageConfig;

  @Input({ required: true }) set config(value: DynamicPageConfig) {
    this._config = {
      showSearch: true,
      showAddBtn: true,
      showEditBtn: true,
      showDeleteBtn: true,
      showCustomActions: true,
      ...value,
    };
  }

  filterForm: FormGroup = new FormGroup({});
  showConfirmDialog = false;
  selectedIdToDelete: string | null = null;
  ngOnInit() {
    this.initFilterForm();
  }
  private initFilterForm() {
    if (this.filterConfigs.length > 0) {
      this.filterConfigs.forEach((config) => {
        this.filterForm.addControl(config.fieldName, new FormControl(null));
      });

      this.filterForm.valueChanges.subscribe((values) => {
        this.onFilterChange.emit(values);
      });
    }
  }

  handleDeleteClick(id: string) {
    this.selectedIdToDelete = id;
    this.showConfirmDialog = true;
  }

  handleDialogResult(result: boolean) {
    this.showConfirmDialog = false;
    if (result && this.selectedIdToDelete) {
      this.onDelete.emit(this.selectedIdToDelete);
    }
    this.selectedIdToDelete = null;
  }

  get config(): DynamicPageConfig {
    return this._config;
  }
}
