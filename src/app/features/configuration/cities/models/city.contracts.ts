import {
  ComboResultBase,
  CreateCommandTenantBase,
  DeleteCommandTenantBase,
  DeleteRangeCommandTenantBase,
  GetComboQueryTenantBase,
  GetListQueryTenantBase,
  GetQueryTenantBase,
  ResultBase,
  UpdateCommandTenantBase,
} from 'src/app/shared/models/base-requests';

export interface CreateCityCommand extends CreateCommandTenantBase<CreateCityCommandResult> {
  arabicName: string;
  englishName: string;
  countryId: string;
}

export interface CreateCityCommandResult extends ResultBase {}

export interface UpdateCityCommand extends UpdateCommandTenantBase<UpdateCityCommandResult> {
  arabicName: string;
  englishName: string;
  countryId: string;
}
export interface UpdateCityCommandResult extends ResultBase {}

export interface DeleteCityCommand extends DeleteCommandTenantBase<DeleteCityCommandResult> {}

export interface DeleteCityCommandResult extends ResultBase {}

export interface DeleteCitysRangeCommand extends DeleteRangeCommandTenantBase<DeleteCitysRangeCommandResult> {}

export interface DeleteCitysRangeCommandResult {}

export interface GetCityQuery extends GetQueryTenantBase<GetCityQueryResult> {}

export interface GetCitysListQuery extends GetListQueryTenantBase<GetCityListQueryResult> {
  countryId: string;
}

export interface GetCityListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  countryId: string;
  countryArabicName: string;
  countryEnglishName: string;
}

export interface GetCityQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  countryId: string;
}

export class GetCitesComboQuery implements GetComboQueryTenantBase<ComboResultBase[]> {
  searchTerm?: string;
  tenantId!: string;
}
