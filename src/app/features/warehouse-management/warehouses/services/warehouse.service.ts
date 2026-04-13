import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetWarehouseListQuery,
  GetWarehouseListQueryResult,
  GetWarehouseQuery,
  GetWarehouseQueryResult,
  CreateWarehouseCommand,
  CreateWarehouseCommandResult,
  UpdateWarehouseCommand,
  UpdateWarehouseCommandResult,
  DeleteWarehouseCommand,
  DeleteWarehouseCommandResult,
  DeleteWarehouseRangeCommand,
  DeleteWarehouseRangeCommandResult,
} from '../models/warehouse.contracts';

@Injectable({ providedIn: 'root' })
export class WarehouseService extends BaseFeatureService<
  GetWarehouseListQuery,
  GetWarehouseListQueryResult,
  GetWarehouseQuery,
  GetWarehouseQueryResult,
  CreateWarehouseCommand,
  CreateWarehouseCommandResult,
  UpdateWarehouseCommand,
  UpdateWarehouseCommandResult,
  DeleteWarehouseCommand,
  DeleteWarehouseCommandResult,
  DeleteWarehouseRangeCommand,
  DeleteWarehouseRangeCommandResult
> {
  protected override endpoint = 'warehouses';
}
