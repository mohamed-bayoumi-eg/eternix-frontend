import { IsActive } from 'src/app/shared/enums/common.enums';
import {
  CreateCommandBase,
  ResultBase,
  UpdateCommandBase,
  DeleteCommandBase,
  DeleteRangeCommandBase,
  GetQueryBase,
  GetListQueryBase,
  GetComboQueryBase,
  ComboResultBase,
} from 'src/app/shared/models/base-requests';

export interface CreateTenantCommand extends CreateCommandBase<CreateTenantCommandResult> {
  arabicName: string;
  englishName: string;
  isActive: IsActive;
  email: string;
  phoneNumber: string;
  adminArabicName: string;
  adminEnglishName: string;
  adminUserName: string;
  adminPassword: string;
}

export interface CreateTenantCommandResult extends ResultBase {}

export interface UpdateTenantCommand extends UpdateCommandBase<UpdateTenantCommandResult> {
  arabicName: string;
  englishName: string;
  isActive: IsActive;
  email: string;
  phoneNumber: string;
}
export interface UpdateTenantCommandResult extends ResultBase {}

export interface DeleteTenantCommand extends DeleteCommandBase<DeleteTenantCommandResult> {}

export interface DeleteTenantCommandResult extends ResultBase {}

export interface DeleteTenantsRangeCommand extends DeleteRangeCommandBase<DeleteTenantsRangeCommandResult> {}

export interface DeleteTenantsRangeCommandResult {}

export interface GetTenantQuery extends GetQueryBase<GetTenantQueryResult> {}

export interface GetTenantsListQuery extends GetListQueryBase<GetTenantListQueryResult> {
  isActive?: IsActive;
}

export interface GetTenantListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  isActive: IsActive;
  email: string;
  phoneNumber: string;
}

export interface GetTenantQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  isActive: IsActive;
  email: string;
  phoneNumber: string;
}

export class GetTenantsComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
