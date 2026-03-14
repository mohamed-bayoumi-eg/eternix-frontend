import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import { GetTenantsListQuery, GetTenantListQueryResult, GetTenantQuery, GetTenantQueryResult, CreateTenantCommand, CreateTenantCommandResult, UpdateTenantCommand, UpdateTenantCommandResult, DeleteTenantCommand, DeleteTenantCommandResult, DeleteTenantsRangeCommand, DeleteTenantsRangeCommandResult } from '../models/tenant.contracts';


@Injectable({ providedIn: 'root' })
export class TenantService extends BaseFeatureService<
  GetTenantsListQuery,
  GetTenantListQueryResult,
  GetTenantQuery,
  GetTenantQueryResult,
  CreateTenantCommand,
  CreateTenantCommandResult,
  UpdateTenantCommand,
  UpdateTenantCommandResult,
  DeleteTenantCommand,
  DeleteTenantCommandResult,
  DeleteTenantsRangeCommand,
  DeleteTenantsRangeCommandResult
> {
  protected override endpoint = 'tenants';
}
