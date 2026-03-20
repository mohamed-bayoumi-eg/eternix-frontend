import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetRolesListQuery,
  GetRoleListQueryResult,
  GetRoleQuery,
  GetRoleQueryResult,
  CreateRoleCommand,
  CreateRoleCommandResult,
  UpdateRoleCommand,
  UpdateRoleCommandResult,
  DeleteRoleCommand,
  DeleteRoleCommandResult,
  DeleteRoleRangeCommand,
  DeleteRoleRangeCommandResult,
} from '../models/role.contracts';

@Injectable({ providedIn: 'root' })
export class RoleService extends BaseFeatureService<
  GetRolesListQuery,
  GetRoleListQueryResult,
  GetRoleQuery,
  GetRoleQueryResult,
  CreateRoleCommand,
  CreateRoleCommandResult,
  UpdateRoleCommand,
  UpdateRoleCommandResult,
  DeleteRoleCommand,
  DeleteRoleCommandResult,
  DeleteRoleRangeCommand,
  DeleteRoleRangeCommandResult
> {
  protected override endpoint = 'roles';
}
