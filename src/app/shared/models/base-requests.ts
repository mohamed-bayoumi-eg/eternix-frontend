import { FieldType } from './dynamic-input-config';

export interface ResultBase {
  id: string;
}

export interface MetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface PagedList<T> {
  items: T[];
  metaData: MetaData;
}

export enum SortingType {
  Ascending = 'Ascending',
  Descending = 'Descending',
}
export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  type?: FieldType;
  visibleWhen?: (row: any) => boolean;
}

export interface ApiResponse {
  isSuccess: boolean;
  message?: string;
  errors?: string[];
  data?: any;
}

export interface CreateCommandBase<TResult> {}

export interface UpdateCommandBase<TResult> {
  id: string;
}

export interface DeleteCommandBase<TResult> {
  id: string;
}

export interface DeleteRangeCommandBase<TResult> {
  ids: string;
}

export interface GetQueryBase<TResponse> {
  id: string;
}

export interface GetListQueryBase<TResponse> {
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
  sortField: string;
  sortType: SortingType;
}

export interface GetComboQueryBase<TResponse> {
  searchTerm?: string;
}

export interface ComboResultBase {
  key: string;
  value: string;
}
