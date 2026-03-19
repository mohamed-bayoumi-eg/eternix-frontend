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
import { UserType } from '../enums/user.enums';

export interface CreateUserCommand extends CreateCommandBase<CreateUserCommandResult> {
  userName: string;
  email: string;
  arabicFullName: string;
  englishFullName: string;
  phoneNumber: string;
  password: string;
  isActive: IsActive;
  userType: UserType;
  roleIds: string[];
}

export interface CreateUserCommandResult extends ResultBase {}

export interface UpdateUserCommand extends UpdateCommandBase<UpdateUserCommandResult> {
  userName: string;
  email: string;
  arabicName: string;
  englishName: string;
  phoneNumber: string;
  password: string;
  isActive: IsActive;
  userType: UserType;
  roleIds: string[];
}
export interface UpdateUserCommandResult extends ResultBase {}

export interface DeleteUserCommand extends DeleteCommandBase<DeleteUserCommandResult> {}

export interface DeleteUserCommandResult extends ResultBase {}

export interface DeleteUsersRangeCommand extends DeleteRangeCommandBase<DeleteUsersRangeCommandResult> {}

export interface DeleteUsersRangeCommandResult {}

export interface GetUserQuery extends GetQueryBase<GetUserQueryResult> {}

export interface GetUsersListQuery extends GetListQueryBase<GetUserListQueryResult> {
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
  roleIds: string[];
}

export class GetUsersComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
