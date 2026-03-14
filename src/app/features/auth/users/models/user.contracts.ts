import { IsActive } from 'src/app/shared/enums/common.enums';
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
import { UserType } from '../enums/user.enums';

export interface UserRoleDto {
  userId: string;
  roleId: string;
}

export interface CreateUserCommand extends CreateCommandTenantBase<CreateUserCommandResult> {
  userName: string;
  email: string;
  arabicFullName: string;
  englishFullName: string;
  phoneNumber: string;
  password: string;
  isActive: IsActive;
  userType: UserType;
  userRoles: UserRoleDto[];
}

export interface CreateUserCommandResult extends ResultBase {}

export interface UpdateUserCommand extends UpdateCommandTenantBase<UpdateUserCommandResult> {
  userName: string;
  email: string;
  arabicName: string;
  englishName: string;
  phoneNumber: string;
  password: string;
  isActive: IsActive;
  userType: UserType;
  userRoles: UserRoleDto[];
}
export interface UpdateUserCommandResult extends ResultBase {}

export interface DeleteUserCommand extends DeleteCommandTenantBase<DeleteUserCommandResult> {}

export interface DeleteUserCommandResult extends ResultBase {}

export interface DeleteUsersRangeCommand extends DeleteRangeCommandTenantBase<DeleteUsersRangeCommandResult> {}

export interface DeleteUsersRangeCommandResult {}

export interface GetUserQuery extends GetQueryTenantBase<GetUserQueryResult> {}

export interface GetUsersListQuery extends GetListQueryTenantBase<GetUserListQueryResult> {
  isActive?: IsActive;
  userType: UserType;
}

export interface GetUserListQueryResult extends ResultBase {
  code: number;
  userName: string;
  email: string;
  arabicFullName: string;
  englishFullName: string;
  phoneNumber: string;
  password: string;
  isActive: IsActive;
  userType: UserType;
}

export interface GetUserQueryResult extends ResultBase {
  code: number;
  userName: string;
  email: string;
  arabicName: string;
  englishName: string;
  phoneNumber: string;
  password: string;
  isActive: IsActive;
  userType: UserType;
  userRoles: UserRoleDto[];
}

export class GetUsersComboQuery implements GetComboQueryTenantBase<ComboResultBase[]> {
  filter?: string;
  tenantId!: string;
}
