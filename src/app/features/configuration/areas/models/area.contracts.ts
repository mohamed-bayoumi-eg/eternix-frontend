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

export interface CreateAreaCommand extends CreateCommandBase<CreateAreaCommandResult> {
  arabicName: string;
  englishName: string;
  cityId: string;
}

export interface CreateAreaCommandResult extends ResultBase {}

export interface UpdateAreaCommand extends UpdateCommandBase<UpdateAreaCommandResult> {
  arabicName: string;
  englishName: string;
  cityId: string;
}
export interface UpdateAreaCommandResult extends ResultBase {}

export interface DeleteAreaCommand extends DeleteCommandBase<DeleteAreaCommandResult> {}

export interface DeleteAreaCommandResult extends ResultBase {}

export interface DeleteAreasRangeCommand extends DeleteRangeCommandBase<DeleteAreasRangeCommandResult> {}

export interface DeleteAreasRangeCommandResult {}

export interface GetAreaQuery extends GetQueryBase<GetAreaQueryResult> {}

export interface GetAreasListQuery extends GetListQueryBase<GetAreaListQueryResult> {
  countryId: string;
}

export interface GetAreaListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  cityId: string;
  cityArabicName: string;
  cityenglishName: string;
}

export interface GetAreaQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  cityId: string;
}

export class GetCitesComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
