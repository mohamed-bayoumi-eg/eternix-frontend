import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetCurrencyListQuery,
  GetCurrencyListQueryResult,
  GetCurrencyQuery,
  GetCurrencyQueryResult,
  CreateCurrencyCommand,
  CreateCurrencyCommandResult,
  UpdateCurrencyCommand,
  UpdateCurrencyCommandResult,
  DeleteCurrencyCommand,
  DeleteCurrencyCommandResult,
  DeleteCurrencyRangeCommand,
  DeleteCurrencyRangeCommandResult,
} from '../models/currency.contracts';

@Injectable({ providedIn: 'root' })
export class CurrencyService extends BaseFeatureService<
  GetCurrencyListQuery,
  GetCurrencyListQueryResult,
  GetCurrencyQuery,
  GetCurrencyQueryResult,
  CreateCurrencyCommand,
  CreateCurrencyCommandResult,
  UpdateCurrencyCommand,
  UpdateCurrencyCommandResult,
  DeleteCurrencyCommand,
  DeleteCurrencyCommandResult,
  DeleteCurrencyRangeCommand,
  DeleteCurrencyRangeCommandResult
> {
  protected override endpoint = 'currencies';
}
