import { OnInit, signal, inject, Directive } from '@angular/core';
import { GetListQueryBase, MetaData, SortingType, PagedList } from '../../../models/base-requests';
import { Router } from '@angular/router';

@Directive()
export abstract class BaseListComponent<
  TResult,
  TQuery extends GetListQueryBase<TResult>,
> implements OnInit {
  protected abstract service: any;
  protected router = inject(Router);

  items = signal<TResult[]>([]);
  metaData = signal<MetaData | null>(null);
  isLoading = signal<boolean>(false);
  query = signal<TQuery>({
    pageNumber: 1,
    pageSize: 5,
    searchTerm: '',
    sortField: 'updatedOn',
    sortType: SortingType.Descending,
  } as TQuery);

  protected abstract baseRoute: string;
  selectedIds = signal<string[]>([]);

  handleSelectionChange(ids: string[]): void {
    this.selectedIds.set(ids);
  }

  ngOnInit(): void {
    this.loadData();
  }
  handleBulkDelete(ids: string[]): void {
    if (ids.length === 0) return;

    const command = {
      ids: ids,
      deletedBy: 0,
    };

    this.service.deleteRange(command).subscribe({
      next: () => {
        this.selectedIds.set([]);
        this.loadData();
      },
    });
  }
  handleAdd(): void {
    this.router.navigate([`${this.baseRoute}/add`]);
  }

  handleEdit(item: any): void {
    this.router.navigate([`${this.baseRoute}/edit`, item.id]);
  }

handleFilterChanged(filterData: any): void {
  this.query.update((q) => {
    const newQuery = { ...q, pageNumber: 1 };

    if (filterData.field) {
      delete (newQuery as any)[filterData.field]; 
      
      return { 
        ...newQuery, 
        [filterData.field]: filterData.value 
      };
    }

    return { ...newQuery, ...filterData };
  });

  this.loadData();
}

  handleSearch(term: string): void {
    this.query.update((q) => ({ ...q, searchTerm: term, pageNumber: 1 }));
    this.loadData();
  }

  handlePageSizeChanged(newSize: number): void {
    this.query.update((q) => ({ ...q, pageSize: newSize, pageNumber: 1 }));
    this.loadData();
  }

  handlePageChanged(delta: number): void {
    const meta = this.metaData();
    if (meta) {
      this.query.update((q) => ({ ...q, pageNumber: meta.currentPage + delta }));
      this.loadData();
    }
  }

  handleSort(field: string): void {
    this.query.update((q) => {
      const isAsc = q.sortField === field && q.sortType === SortingType.Ascending;
      return {
        ...q,
        sortField: field,
        sortType: isAsc ? SortingType.Descending : SortingType.Ascending,
        pageNumber: 1,
      };
    });
    this.loadData();
  }

  handleDelete(id: string): void {
    this.isLoading.set(true);
    this.service.delete({ id }).subscribe({
      next: () => {
        this.loadData();
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
  loadData(): void {
    this.isLoading.set(true);

    this.service.getList(this.query()).subscribe({
      next: (response: any) => {
        const pagedData = response.data as PagedList<TResult>;

        if (pagedData) {
          this.items.set(pagedData.items);
          this.metaData.set(pagedData.metaData);
        } else {
          this.items.set(response.items || []);
          this.metaData.set(response.metaData || null);
        }
      },
      error: (err: any) => {
        this.items.set([]);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
