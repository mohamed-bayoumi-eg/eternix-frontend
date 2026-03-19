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

export interface CreateCountryCommand extends CreateCommandBase<CreateCountryCommandResult> {
  arabicName: string;
  englishName: string;
}

export interface CreateCountryCommandResult extends ResultBase {}

export interface UpdateCountryCommand extends UpdateCommandBase<UpdateCountryCommandResult> {
  arabicName: string;
  englishName: string;
}
export interface UpdateCountryCommandResult extends ResultBase {}

export interface DeleteCountryCommand extends DeleteCommandBase<DeleteCountryCommandResult> {}

export interface DeleteCountryCommandResult extends ResultBase {}

export interface DeleteCountrysRangeCommand extends DeleteRangeCommandBase<DeleteCountrysRangeCommandResult> {}

export interface DeleteCountrysRangeCommandResult {}

export interface GetCountryQuery extends GetQueryBase<GetCountryQueryResult> {}

export interface GetCountrysListQuery extends GetListQueryBase<GetCountryListQueryResult> {}

export interface GetCountryListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
}

export interface GetCountryQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
}

export class GetCountrysComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
