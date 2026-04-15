import {
  CreateCommandBase,
  ResultBase,
  UpdateCommandBase,
  DeleteCommandBase,
  DeleteRangeCommandBase,
  GetQueryBase,
  GetListQueryBase,
  GetComboQueryBase,
  ComboResultBase,
} from 'src/app/shared/models/base-requests';
import { TaxType } from '../enums/tax.enums';
import { YesNo } from 'src/app/shared/enums/common.enums';

export interface CreateTaxCommand extends CreateCommandBase<CreateTaxCommandResult> {
  arabicName: string;
  englishName: string;
  percentage: number;
  taxAuthorityCode: string | null;
  taxType: TaxType;
  isActive: YesNo;
}

export interface CreateTaxCommandResult extends ResultBase {}

export interface UpdateTaxCommand extends UpdateCommandBase<UpdateTaxCommandResult> {
  arabicName: string;
  englishName: string;
  percentage: number;
  taxAuthorityCode: string | null;
  taxType: TaxType;
  isActive: YesNo;
}
export interface UpdateTaxCommandResult extends ResultBase {}

export interface DeleteTaxCommand extends DeleteCommandBase<DeleteTaxCommandResult> {}

export interface DeleteTaxCommandResult extends ResultBase {}

export interface DeleteTaxRangeCommand extends DeleteRangeCommandBase<DeleteTaxRangeCommandResult> {}

export interface DeleteTaxRangeCommandResult {}

export interface GetTaxQuery extends GetQueryBase<GetTaxQueryResult> {}

export interface GetTaxListQuery extends GetListQueryBase<GetTaxListQueryResult> {}

export interface GetTaxListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  percentage: number;
  taxAuthorityCode: string | null;
  taxType: TaxType;
  isActive: YesNo;
}

export interface GetTaxQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  percentage: number;
  taxAuthorityCode: string | null;
  taxType: TaxType;
  isActive: YesNo;
}

export class GetTaxComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
