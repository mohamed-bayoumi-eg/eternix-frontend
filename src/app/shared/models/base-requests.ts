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
}

export interface ApiResponse {
  isSuccess: boolean;
  message?: string;
  errors?: string[];
  data?: any;
}

export interface CreateCommandBase<TResult> {
  createdBy: string;
}
export interface CreateCommandTenantBase<TResult> {
  createdBy: string;
  tenantId: string;
}

export interface UpdateCommandBase<TResult> {
  id: string;
  updatedBy: string;
}
export interface UpdateCommandTenantBase<TResult> {
  id: string;
  updatedBy: string;
  tenantId: string;
}

export interface DeleteCommandBase<TResult> {
  id: string;
  deletedBy: string;
}

export interface DeleteCommandTenantBase<TResult> {
  id: string;
  deletedBy: string;
  tenantId: string;
}
export interface DeleteRangeCommandBase<TResult> {
  ids: string;
  deletedBy: string;
}
export interface DeleteRangeCommandTenantBase<TResult> {
  ids: string;
  deletedBy: string;
  tenantId: string;
}
export interface GetQueryBase<TResponse> {
  id: string;
}
export interface GetQueryTenantBase<TResponse> {
  id: string;
  tenantId: string;
}
export interface GetListQueryBase<TResponse> {
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
  sortField: string;
  sortType: SortingType;
}
export interface GetListQueryTenantBase<TResponse> {
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
  sortField: string;
  sortType: SortingType;
  tenantId: string;
}
export interface GetComboQueryBase<TResponse> {
  filter?: string;
}
export interface GetComboQueryTenantBase<TResponse> {
  filter?: string;
  tenantId: string;
}

export interface ComboResultBase {
  key: string;
  value: string;
}
