import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableColumn, MetaData, SortingType } from '../../../models/base-requests';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-table-component',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './dynamic-table-component.html',
  styleUrl: './dynamic-table-component.scss',
})
export class DynamicTableComponent implements OnChanges {
  @Input({ required: true }) columns: TableColumn[] = [];
  @Input({ required: true }) items: any[] = [];
  @Input() metaData: MetaData | null = null;
  @Input() isLoading = false;
  @Input() sortField = '';
  @Input() sortType: SortingType = SortingType.Ascending;
  @Input() showEdit = true;
  @Input() showDelete = true;

  @Output() sortChange = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() editAction = new EventEmitter<any>();
  @Output() deleteAction = new EventEmitter<string>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() selectionChange = new EventEmitter<string[]>();
  @Output() onBulkDelete = new EventEmitter<string[]>();

  selectedIds = new Set<string>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      this.selectedIds.clear();
      this.emitSelection();
    }
  }

  toggleItem(id: string, event: any) {
    event.target.checked ? this.selectedIds.add(id) : this.selectedIds.delete(id);
    this.emitSelection();
  }

  toggleAll(event: any) {
    if (event.target.checked) {
      this.items.forEach((item) => this.selectedIds.add(item.id));
    } else {
      this.selectedIds.clear();
    }
    this.emitSelection();
  }

  bulkDeleteAction() {
    if (this.selectedIds.size > 0) {
      this.onBulkDelete.emit(Array.from(this.selectedIds));
    }
  }

  private emitSelection() {
    this.selectionChange.emit(Array.from(this.selectedIds));
  }

  isSelected(id: string): boolean {
    return this.selectedIds.has(id);
  }

  isAllSelected(): boolean {
    return this.items.length > 0 && this.selectedIds.size === this.items.length;
  }

  getSortingIcon(field: string): string {
    if (this.sortField !== field) return 'fa-sort';
    return this.sortType === SortingType.Ascending ? 'fa-sort-up active' : 'fa-sort-down active';
  }

  getPageNumbers(): number[] {
    const total = this.metaData?.totalPages || 0;
    const current = this.metaData?.currentPage || 1;
    if (total === 0) return [];

    let start = Math.max(1, current - 2);
    let end = Math.min(total, current + 2);

    return Array.from({ length: (end - start) + 1 }, (_, i) => start + i);
  }

  goToPage(page: number) {
    if (this.metaData && page !== this.metaData.currentPage) {
      this.pageChange.emit(page - this.metaData.currentPage);
    }
  }
}