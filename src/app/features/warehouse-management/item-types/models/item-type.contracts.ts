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

export interface CreateItemTypeCommand extends CreateCommandBase<CreateItemTypeCommandResult> {
  arabicName: string;
  englishName: string;
  taxIds: string[] | null;
}

export interface CreateItemTypeCommandResult extends ResultBase {}

export interface UpdateItemTypeCommand extends UpdateCommandBase<UpdateItemTypeCommandResult> {
  arabicName: string;
  englishName: string;
  taxIds: string[] | null;
}
export interface UpdateItemTypeCommandResult extends ResultBase {}

export interface DeleteItemTypeCommand extends DeleteCommandBase<DeleteItemTypeCommandResult> {}

export interface DeleteItemTypeCommandResult extends ResultBase {}

export interface DeleteItemTypeRangeCommand extends DeleteRangeCommandBase<DeleteItemTypeRangeCommandResult> {}

export interface DeleteItemTypeRangeCommandResult {}

export interface GetItemTypeQuery extends GetQueryBase<GetItemTypeQueryResult> {}

export interface GetItemTypeListQuery extends GetListQueryBase<GetItemTypeListQueryResult> {}

export interface GetItemTypeListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
}

export interface GetItemTypeQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  taxIds: string[] | null;
}

export class GetItemTypeComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
