import { CreateCommandTenantBase, ResultBase, UpdateCommandTenantBase, DeleteCommandTenantBase, DeleteRangeCommandTenantBase, GetQueryTenantBase, GetListQueryTenantBase, GetComboQueryTenantBase, ComboResultBase } from "src/app/shared/models/base-requests";
import { PermissionType } from "../enums/role.enums";


export interface RolePermissionDto {
  screenId: string;
  permissionType: PermissionType;
}

export interface CreateRoleCommand extends CreateCommandTenantBase<CreateRoleCommandResult> {
  arabicName: string;
  englishName: string;
  description: string;
  permissions: RolePermissionDto[];
}

export interface CreateRoleCommandResult extends ResultBase {}

export interface UpdateRoleCommand extends UpdateCommandTenantBase<UpdateRoleCommandResult> {
  arabicName: string;
  englishName: string;
  description: string;
  permissions: RolePermissionDto[];
}
export interface UpdateRoleCommandResult extends ResultBase {}

export interface DeleteRoleCommand extends DeleteCommandTenantBase<DeleteRoleCommandResult> {}

export interface DeleteRoleCommandResult extends ResultBase {}

export interface DeleteRolesRangeCommand extends DeleteRangeCommandTenantBase<DeleteRolesRangeCommandResult> {}

export interface DeleteRolesRangeCommandResult {}

export interface GetRoleQuery extends GetQueryTenantBase<GetRoleQueryResult> {}

export interface GetRolesListQuery extends GetListQueryTenantBase<GetRoleListQueryResult> {}

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

export class GetRolesComboQuery implements GetComboQueryTenantBase<ComboResultBase[]> {
  searchTerm?: string;
  tenantId!: string;
}
