import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetCountrysListQuery,
  GetCountryListQueryResult,
  GetCountryQuery,
  GetCountryQueryResult,
  CreateCountryCommand,
  CreateCountryCommandResult,
  UpdateCountryCommand,
  UpdateCountryCommandResult,
  DeleteCountryCommand,
  DeleteCountryCommandResult,
  DeleteCountrysRangeCommand,
  DeleteCountrysRangeCommandResult,
} from '../models/country.contracts';

@Injectable({ providedIn: 'root' })
export class CountryService extends BaseFeatureService<
  GetCountrysListQuery,
  GetCountryListQueryResult,
  GetCountryQuery,
  GetCountryQueryResult,
  CreateCountryCommand,
  CreateCountryCommandResult,
  UpdateCountryCommand,
  UpdateCountryCommandResult,
  DeleteCountryCommand,
  DeleteCountryCommandResult,
  DeleteCountrysRangeCommand,
  DeleteCountrysRangeCommandResult
> {
  protected override endpoint = 'countries';
}
