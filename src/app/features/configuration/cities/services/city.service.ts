import { Injectable } from "@angular/core";
import { BaseFeatureService } from "src/app/shared/services/base-feature.service";
import { GetCitysListQuery, GetCityListQueryResult, GetCityQuery, GetCityQueryResult, CreateCityCommand, CreateCityCommandResult, UpdateCityCommand, UpdateCityCommandResult, DeleteCityCommand, DeleteCityCommandResult, DeleteCitysRangeCommand, DeleteCitysRangeCommandResult } from "../models/city.contracts";

@Injectable({ providedIn: 'root' })
export class CityService extends BaseFeatureService<
  GetCitysListQuery,
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
