import {
  ComboResultBase,
  CreateCommandBase,
  DeleteCommandBase,
  DeleteRangeCommandBase,
  GetComboQueryBase,
  GetListQueryBase,
  GetQueryBase,
  ResultBase,
  UpdateCommandBase,
} from 'src/app/shared/models/base-requests';

export interface CreateCityCommand extends CreateCommandBase<CreateCityCommandResult> {
  arabicName: string;
  englishName: string;
  countryId: string;
}

export interface CreateCityCommandResult extends ResultBase {}

export interface UpdateCityCommand extends UpdateCommandBase<UpdateCityCommandResult> {
  arabicName: string;
  englishName: string;
  countryId: string;
}
export interface UpdateCityCommandResult extends ResultBase {}

export interface DeleteCityCommand extends DeleteCommandBase<DeleteCityCommandResult> {}

export interface DeleteCityCommandResult extends ResultBase {}

export interface DeleteCitysRangeCommand extends DeleteRangeCommandBase<DeleteCitysRangeCommandResult> {}

export interface DeleteCitysRangeCommandResult {}

export interface GetCityQuery extends GetQueryBase<GetCityQueryResult> {}

export interface GetCityListQuery extends GetListQueryBase<GetCityListQueryResult> {
  countryId: string;
}

export interface GetCityListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  countryId: string;
  countryArabicName: string;
  countryEnglishName: string;
}

export interface GetCityQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  countryId: string;
}

export class GetCityComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
  countryId?: string;
}
