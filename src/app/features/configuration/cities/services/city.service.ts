import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetCityListQueryResult,
  GetCityQuery,
  GetCityQueryResult,
  CreateCityCommand,
  CreateCityCommandResult,
  UpdateCityCommand,
  UpdateCityCommandResult,
  DeleteCityCommand,
  DeleteCityCommandResult,
  DeleteCitysRangeCommand,
  DeleteCitysRangeCommandResult,
  GetCityListQuery,
} from '../models/city.contracts';

@Injectable({ providedIn: 'root' })
export class CityService extends BaseFeatureService<
  GetCityListQuery,
  GetCityListQueryResult,
  GetCityQuery,
  GetCityQueryResult,
  CreateCityCommand,
  CreateCityCommandResult,
  UpdateCityCommand,
  UpdateCityCommandResult,
  DeleteCityCommand,
  DeleteCityCommandResult,
  DeleteCitysRangeCommand,
  DeleteCitysRangeCommandResult
> {
  protected override endpoint = 'cities';
}
