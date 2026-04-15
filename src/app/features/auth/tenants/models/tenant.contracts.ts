import { YesNo } from 'src/app/shared/enums/common.enums';
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
  isActive: YesNo;
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
  isActive: YesNo;
  email: string;
  phoneNumber: string;
}
export interface UpdateTenantCommandResult extends ResultBase {}

export interface DeleteTenantCommand extends DeleteCommandBase<DeleteTenantCommandResult> {}

export interface DeleteTenantCommandResult extends ResultBase {}

export interface DeleteTenantRangeCommand extends DeleteRangeCommandBase<DeleteTenantRangeCommandResult> {}

export interface DeleteTenantRangeCommandResult {}

export interface GetTenantQuery extends GetQueryBase<GetTenantQueryResult> {}

export interface GetTenantListQuery extends GetListQueryBase<GetTenantListQueryResult> {
  isActive?: YesNo;
}

export interface GetTenantListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  isActive: YesNo;
  email: string;
  phoneNumber: string;
}

export interface GetTenantQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  isActive: YesNo;
  email: string;
  phoneNumber: string;
}

export class GetTenantsComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
