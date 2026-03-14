import { Injectable } from '@angular/core';
import { BaseFeatureService } from '../../../shared/services/base-feature.service';
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
  DeleteRolesRangeCommand,
  DeleteRolesRangeCommandResult,
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
  DeleteRolesRangeCommand,
  DeleteRolesRangeCommandResult
> {
  protected override endpoint = 'roles';
}
