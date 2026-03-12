import { Injectable } from '@angular/core';
import { BaseFeatureService } from '../../../shared/services/base-feature.service';
import {
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
} from '../models/tenant.contracts';

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
  DeleteTenantCommandResult
> {
  protected override endpoint = 'tenants';
}
