import {
  CreateCommandTenantBase,
  ResultBase,
  UpdateCommandTenantBase,
  DeleteCommandTenantBase,
  DeleteRangeCommandTenantBase,
  GetQueryTenantBase,
  GetListQueryTenantBase,
  GetComboQueryTenantBase,
  ComboResultBase,
} from 'src/app/shared/models/base-requests';

export interface CreateAreaCommand extends CreateCommandTenantBase<CreateAreaCommandResult> {
  arabicName: string;
  englishName: string;
  cityId: string;
}

export interface CreateAreaCommandResult extends ResultBase {}

export interface UpdateAreaCommand extends UpdateCommandTenantBase<UpdateAreaCommandResult> {
  arabicName: string;
  englishName: string;
  cityId: string;
}
export interface UpdateAreaCommandResult extends ResultBase {}

export interface DeleteAreaCommand extends DeleteCommandTenantBase<DeleteAreaCommandResult> {}

export interface DeleteAreaCommandResult extends ResultBase {}

export interface DeleteAreasRangeCommand extends DeleteRangeCommandTenantBase<DeleteAreasRangeCommandResult> {}

export interface DeleteAreasRangeCommandResult {}

export interface GetAreaQuery extends GetQueryTenantBase<GetAreaQueryResult> {}

export interface GetAreasListQuery extends GetListQueryTenantBase<GetAreaListQueryResult> {
  countryId: string;
}

export interface GetAreaListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  cityId: string;
  cityArabicName: string;
  cityenglishName: string;
}

export interface GetAreaQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  cityId: string;
}

export class GetCitesComboQuery implements GetComboQueryTenantBase<ComboResultBase[]> {
  searchTerm?: string;
  tenantId!: string;
}
