import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetTaxListQuery,
  GetTaxListQueryResult,
  GetTaxQuery,
  GetTaxQueryResult,
  CreateTaxCommand,
  CreateTaxCommandResult,
  UpdateTaxCommand,
  UpdateTaxCommandResult,
  DeleteTaxCommand,
  DeleteTaxCommandResult,
  DeleteTaxRangeCommand,
  DeleteTaxRangeCommandResult,
} from '../models/tax.contracts';

@Injectable({ providedIn: 'root' })
export class TaxService extends BaseFeatureService<
  GetTaxListQuery,
  GetTaxListQueryResult,
  GetTaxQuery,
  GetTaxQueryResult,
  CreateTaxCommand,
  CreateTaxCommandResult,
  UpdateTaxCommand,
  UpdateTaxCommandResult,
  DeleteTaxCommand,
  DeleteTaxCommandResult,
  DeleteTaxRangeCommand,
  DeleteTaxRangeCommandResult
> {
  protected override endpoint = 'taxes';
}
