import { OnInit, signal, inject, Directive } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { GetListQueryBase, MetaData, SortingType, PagedList } from '../../../models/base-requests';

@Directive()
export abstract class BaseListComponent<
  TResult,
  TQuery extends GetListQueryBase<TResult>,
> implements OnInit {
  items = signal<TResult[]>([]);
  metaData = signal<MetaData | null>(null);
  isLoading = signal<boolean>(false);

  query = signal<TQuery>({
    pageNumber: 1,
    pageSize: 5,
    searchTerm: '',
    sortField: 'id',
    sortType: SortingType.Ascending,
  } as TQuery);

  private searchSubject = new Subject<string>();

  protected abstract service: any;

  constructor() {
    this.initSearchDebounce();
  }

  ngOnInit(): void {
    this.loadData();
  }

  private initSearchDebounce() {
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((term) => {
      this.query.update((q) => ({ ...q, searchTerm: term, pageNumber: 1 }));
      this.loadData();
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
        }

        this.isLoading.set(false);
      },
    });
  }

  onSearchManual(term: string): void {
    this.searchSubject.next(term);
  }

  updateFilter(filterUpdates: Partial<TQuery>): void {
    this.query.update((q) => ({ ...q, ...filterUpdates, pageNumber: 1 }));
    this.loadData();
  }

  onDeleteBase(id: string, deleteParams: any = { deletedBy: 'admin' }): void {
    if (confirm('Are you sure?')) {
      this.service.delete({ id, ...deleteParams }).subscribe(() => this.loadData());
    }
  }
  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchSubject.next(term);
  }
  onFilterUpdate(event: { field: string; value: any }): void {
    this.query.update((q) => ({
      ...q,
      [event.field]: event.value,
      pageNumber: 1,
    }));
    this.loadData();
  }
  changePage(delta: number): void {
    const meta = this.metaData();
    if (meta) {
      const nextPage = meta.currentPage + delta;
      this.query.update((q) => ({ ...q, pageNumber: nextPage }));
      this.loadData();
    }
  }

  onSort(field: string): void {
    this.query.update((q) => {
      const isSameField = q.sortField === field;
      const isCurrentlyAsc = q.sortType === SortingType.Ascending;

      const newType =
        isSameField && isCurrentlyAsc ? SortingType.Descending : SortingType.Ascending;

      return {
        ...q,
        sortField: field,
        sortType: newType,
        pageNumber: 1,
      };
    });

    this.loadData();
  }
}
