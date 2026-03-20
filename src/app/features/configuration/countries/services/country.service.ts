import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetCountryListQuery,
  GetCountryListQueryResult,
  GetCountryQuery,
  GetCountryQueryResult,
  CreateCountryCommand,
  CreateCountryCommandResult,
  UpdateCountryCommand,
  UpdateCountryCommandResult,
  DeleteCountryCommand,
  DeleteCountryCommandResult,
  DeleteCountryRangeCommand,
  DeleteCountryRangeCommandResult,
} from '../models/country.contracts';

@Injectable({ providedIn: 'root' })
export class CountryService extends BaseFeatureService<
  GetCountryListQuery,
  GetCountryListQueryResult,
  GetCountryQuery,
  GetCountryQueryResult,
  CreateCountryCommand,
  CreateCountryCommandResult,
  UpdateCountryCommand,
  UpdateCountryCommandResult,
  DeleteCountryCommand,
  DeleteCountryCommandResult,
  DeleteCountryRangeCommand,
  DeleteCountryRangeCommandResult
> {
  protected override endpoint = 'countries';
}
