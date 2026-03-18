import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { TableColumn, MetaData } from '../../../models/base-requests';
import { DynamicInputConfig, InputType } from '../../../models/dynamic-input-config';
import { DynamicListPageConfig } from '../../../models/dynamic-page-config';

import { DynamicTableComponent } from '../../dynamic-components/dynamic-table-component/dynamic-table-component';
import { DynamicInputComponent } from '../dynamic-input-component/dynamic-input-component';
import { ConfirmDialogComponent } from '../../ui-components/confirm-dialog-component/confirm-dialog-component';

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
  @Input({ required: true }) columns: TableColumn[] = [];
  @Input() items: any[] = [];
  @Input() metaData: MetaData | null = null;
  @Input() isLoading = false;
  @Input() query: any = null;
  @Input() filterConfigs: DynamicInputConfig[] = [];

  private _config!: DynamicListPageConfig;
  @Input({ required: true }) set config(value: DynamicListPageConfig) {
    this._config = {
      showSearch: true,
      showAddBtn: true,
      showEditBtn: true,
      showDeleteBtn: true,
      ...value,
    };
  }
  get config() { return this._config; }

  @Output() onFilterChange = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<any>();
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
    type: InputType.Text,
    fieldName: 'searchTerm',
    label: 'search',
    showErrorMessage: false,
  };

  ngOnInit() {
    this.initFilterForm();
  }

  private initFilterForm() {
    this.filterForm.addControl(this.searchConfig.fieldName, new FormControl(null));

    this.filterConfigs?.forEach(cfg => {
      this.filterForm.addControl(cfg.fieldName, new FormControl(null));
    });

    this.filterForm.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged((p, c) => JSON.stringify(p) === JSON.stringify(c))
    ).subscribe(values => this.onFilterChange.emit(values));
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