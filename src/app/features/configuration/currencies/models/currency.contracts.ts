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

export interface CreateCurrencyCommand extends CreateCommandBase<CreateCurrencyCommandResult> {
  arabicName: string;
  englishName: string;
  iSOCode: string;
  symbol: string;
  arabicSubUnitName: string;
  englishSubUnitName: string;
}

export interface CreateCurrencyCommandResult extends ResultBase {}

export interface UpdateCurrencyCommand extends UpdateCommandBase<UpdateCurrencyCommandResult> {
  arabicName: string;
  englishName: string;
  iSOCode: string;
  symbol: string;
  arabicSubUnitName: string;
  englishSubUnitName: string;
}
export interface UpdateCurrencyCommandResult extends ResultBase {}

export interface DeleteCurrencyCommand extends DeleteCommandBase<DeleteCurrencyCommandResult> {}

export interface DeleteCurrencyCommandResult extends ResultBase {}

export interface DeleteCurrencyRangeCommand extends DeleteRangeCommandBase<DeleteCurrencyRangeCommandResult> {}

export interface DeleteCurrencyRangeCommandResult {}

export interface GetCurrencyQuery extends GetQueryBase<GetCurrencyQueryResult> {}

export interface GetCurrencyListQuery extends GetListQueryBase<GetCurrencyListQueryResult> {}

export interface GetCurrencyListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  isoCode: string;
  symbol: string;
  arabicSubUnitName: string;
  englishSubUnitName: string;
}

export interface GetCurrencyQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  isoCode: string;
  symbol: string;
  arabicSubUnitName: string;
  englishSubUnitName: string;
}

export class GetCurrencyComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
