import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetUnitListQuery,
  GetUnitListQueryResult,
  GetUnitQuery,
  GetUnitQueryResult,
  CreateUnitCommand,
  CreateUnitCommandResult,
  UpdateUnitCommand,
  UpdateUnitCommandResult,
  DeleteUnitCommand,
  DeleteUnitCommandResult,
  DeleteUnitRangeCommand,
  DeleteUnitRangeCommandResult,
} from '../models/unit.contracts';

@Injectable({ providedIn: 'root' })
export class UnitService extends BaseFeatureService<
  GetUnitListQuery,
  GetUnitListQueryResult,
  GetUnitQuery,
  GetUnitQueryResult,
  CreateUnitCommand,
  CreateUnitCommandResult,
  UpdateUnitCommand,
  UpdateUnitCommandResult,
  DeleteUnitCommand,
  DeleteUnitCommandResult,
  DeleteUnitRangeCommand,
  DeleteUnitRangeCommandResult
> {
  protected override endpoint = 'units';
}
