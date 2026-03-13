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

  ngOnInit(): void {
    this.loadData();
  }

  onAdd(): void {
    this.router.navigate([`${this.baseRoute}/add`]);
  }

  onEdit(item: any): void {
    this.router.navigate([`${this.baseRoute}/edit`, item.id]);
  }

  onFilterChanged(filters: any): void {
    this.query.update((q) => ({ ...q, ...filters, pageNumber: 1 }));
    this.loadData();
  }

  onSearch(term: string): void {
    this.query.update((q) => ({ ...q, searchTerm: term, pageNumber: 1 }));
    this.loadData();
  }

  onPageSizeChanged(newSize: number): void {
    this.query.update((q) => ({ ...q, pageSize: newSize, pageNumber: 1 }));
    this.loadData();
  }

  onPageChanged(delta: number): void {
    const meta = this.metaData();
    if (meta) {
      this.query.update((q) => ({ ...q, pageNumber: meta.currentPage + delta }));
      this.loadData();
    }
  }

  onSort(field: string): void {
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

  onDelete(id: string): void {
    if (confirm('Are you sure?')) {
      this.service.delete({ id }).subscribe(() => this.loadData());
    }
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
        console.error('Error loading data:', err);
        this.items.set([]);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
