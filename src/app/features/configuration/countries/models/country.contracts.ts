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

export interface CreateCountryCommand extends CreateCommandTenantBase<CreateCountryCommandResult> {
  arabicName: string;
  englishName: string;
}

export interface CreateCountryCommandResult extends ResultBase {}

export interface UpdateCountryCommand extends UpdateCommandTenantBase<UpdateCountryCommandResult> {
  arabicName: string;
  englishName: string;
}
export interface UpdateCountryCommandResult extends ResultBase {}

export interface DeleteCountryCommand extends DeleteCommandTenantBase<DeleteCountryCommandResult> {}

export interface DeleteCountryCommandResult extends ResultBase {}

export interface DeleteCountrysRangeCommand extends DeleteRangeCommandTenantBase<DeleteCountrysRangeCommandResult> {}

export interface DeleteCountrysRangeCommandResult {}

export interface GetCountryQuery extends GetQueryTenantBase<GetCountryQueryResult> {}

export interface GetCountrysListQuery extends GetListQueryTenantBase<GetCountryListQueryResult> {}

export interface GetCountryListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
}

export interface GetCountryQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
}

export class GetCountrysComboQuery implements GetComboQueryTenantBase<ComboResultBase[]> {
  searchTerm?: string;
  tenantId!: string;
}
