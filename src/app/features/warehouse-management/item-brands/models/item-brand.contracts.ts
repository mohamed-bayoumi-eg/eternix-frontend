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

export interface CreateItemBrandCommand extends CreateCommandBase<CreateItemBrandCommandResult> {
  arabicName: string;
  englishName: string;
}

export interface CreateItemBrandCommandResult extends ResultBase {}

export interface UpdateItemBrandCommand extends UpdateCommandBase<UpdateItemBrandCommandResult> {
  arabicName: string;
  englishName: string;
}
export interface UpdateItemBrandCommandResult extends ResultBase {}

export interface DeleteItemBrandCommand extends DeleteCommandBase<DeleteItemBrandCommandResult> {}

export interface DeleteItemBrandCommandResult extends ResultBase {}

export interface DeleteItemBrandRangeCommand extends DeleteRangeCommandBase<DeleteItemBrandRangeCommandResult> {}

export interface DeleteItemBrandRangeCommandResult {}

export interface GetItemBrandQuery extends GetQueryBase<GetItemBrandQueryResult> {}

export interface GetItemBrandListQuery extends GetListQueryBase<GetItemBrandListQueryResult> {}

export interface GetItemBrandListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
}

export interface GetItemBrandQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
}

export class GetItemBrandComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
