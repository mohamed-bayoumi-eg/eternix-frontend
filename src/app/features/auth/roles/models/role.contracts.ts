import { CreateCommandBase, ResultBase, UpdateCommandBase, DeleteCommandBase, DeleteRangeCommandBase, GetQueryBase, GetListQueryBase, GetComboQueryBase, ComboResultBase } from "src/app/shared/models/base-requests";
import { PermissionType } from "../enums/role.enums";


export interface RolePermissionDto {
  screenId: string;
  permissionType: PermissionType;
}

export interface CreateRoleCommand extends CreateCommandBase<CreateRoleCommandResult> {
  arabicName: string;
  englishName: string;
  description: string;
  permissions: RolePermissionDto[];
}

export interface CreateRoleCommandResult extends ResultBase {}

export interface UpdateRoleCommand extends UpdateCommandBase<UpdateRoleCommandResult> {
  arabicName: string;
  englishName: string;
  description: string;
  permissions: RolePermissionDto[];
}
export interface UpdateRoleCommandResult extends ResultBase {}

export interface DeleteRoleCommand extends DeleteCommandBase<DeleteRoleCommandResult> {}

export interface DeleteRoleCommandResult extends ResultBase {}

export interface DeleteRoleRangeCommand extends DeleteRangeCommandBase<DeleteRoleRangeCommandResult> {}

export interface DeleteRoleRangeCommandResult {}

export interface GetRoleQuery extends GetQueryBase<GetRoleQueryResult> {}

export interface GetRoleListQuery extends GetListQueryBase<GetRoleListQueryResult> {}

export interface GetRoleListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  description: string;
  permissions: RolePermissionDto[];
}

export interface GetRoleQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  description: string;
  permissions: RolePermissionDto[];
}

export class GetRoleComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
