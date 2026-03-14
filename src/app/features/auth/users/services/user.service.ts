import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import { GetUsersListQuery, GetUserListQueryResult, GetUserQuery, GetUserQueryResult, CreateUserCommand, CreateUserCommandResult, UpdateUserCommand, UpdateUserCommandResult, DeleteUserCommand, DeleteUserCommandResult, DeleteUsersRangeCommand, DeleteUsersRangeCommandResult } from '../models/user.contracts';


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
  DeleteUsersRangeCommand,
  DeleteUsersRangeCommandResult
> {
  protected override endpoint = 'Users';
}
