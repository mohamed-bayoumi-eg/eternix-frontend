import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetUsersListQuery,
  GetUserListQueryResult,
  GetUserQuery,
  GetUserQueryResult,
  CreateUserCommand,
  CreateUserCommandResult,
  UpdateUserCommand,
  UpdateUserCommandResult,
  DeleteUserCommand,
  DeleteUserCommandResult,
  DeleteUserRangeCommand,
  DeleteUserRangeCommandResult,
} from '../models/user.contracts';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseFeatureService<
  GetUsersListQuery,
  GetUserListQueryResult,
  GetUserQuery,
  GetUserQueryResult,
  CreateUserCommand,
  CreateUserCommandResult,
  UpdateUserCommand,
  UpdateUserCommandResult,
  DeleteUserCommand,
  DeleteUserCommandResult,
  DeleteUserRangeCommand,
  DeleteUserRangeCommandResult
> {
  protected override endpoint = 'Users';
}
