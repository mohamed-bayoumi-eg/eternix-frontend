import { IsActive } from '../../../shared/enums/common.enums';
import {
  CreateCommandBase,
  ResultBase,
  UpdateCommandBase,
  GetQueryBase,
  GetListQueryBase,
  DeleteCommandBase,
  GetComboQueryBase,
} from '../../../shared/models/base-requests';

export interface CreateTenantCommand extends CreateCommandBase<CreateTenantCommandResult> {
  arabicName: string;
  englishName: string;
  isActive: IsActive;
}

export interface CreateTenantCommandResult extends ResultBase {}

export interface UpdateTenantCommand extends UpdateCommandBase<UpdateTenantCommandResult> {
  arabicName: string;
  englishName: string;
  isActive: IsActive;
}
export interface UpdateTenantCommandResult extends ResultBase {}

export interface DeleteTenantCommand extends DeleteCommandBase<DeleteTenantCommandResult> {}

export interface DeleteTenantCommandResult extends ResultBase {}

export interface GetTenantQuery extends GetQueryBase<GetTenantQueryResult> {}

export interface GetTenantsListQuery extends GetListQueryBase<GetTenantListQueryResult> {
  isActive?: IsActive;
}

export interface GetTenantListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  isActive: IsActive;
}

export interface GetTenantQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  isActive: IsActive;
}

export interface GetTenantsComboQuery extends GetComboQueryBase<GetTenantsComboQueryResult[]> {}

export interface GetTenantsComboQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  isActive: IsActive;
}
