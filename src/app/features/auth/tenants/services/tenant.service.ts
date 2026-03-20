import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetTenantListQuery,
  GetTenantListQueryResult,
  GetTenantQuery,
  GetTenantQueryResult,
  CreateTenantCommand,
  CreateTenantCommandResult,
  UpdateTenantCommand,
  UpdateTenantCommandResult,
  DeleteTenantCommand,
  DeleteTenantCommandResult,
  DeleteTenantRangeCommand,
  DeleteTenantRangeCommandResult,
} from '../models/tenant.contracts';

@Injectable({ providedIn: 'root' })
export class TenantService extends BaseFeatureService<
  GetTenantListQuery,
  GetTenantListQueryResult,
  GetTenantQuery,
  GetTenantQueryResult,
  CreateTenantCommand,
  CreateTenantCommandResult,
  UpdateTenantCommand,
  UpdateTenantCommandResult,
  DeleteTenantCommand,
  DeleteTenantCommandResult,
  DeleteTenantRangeCommand,
  DeleteTenantRangeCommandResult
> {
  protected override endpoint = 'tenants';
}
