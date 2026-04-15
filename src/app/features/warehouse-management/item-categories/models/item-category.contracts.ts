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

export interface CreateItemCategoryCommand extends CreateCommandBase<CreateItemCategoryCommandResult> {
  arabicName: string;
  englishName: string;
  itemTypeId: string;
}

export interface CreateItemCategoryCommandResult extends ResultBase {}

export interface UpdateItemCategoryCommand extends UpdateCommandBase<UpdateItemCategoryCommandResult> {
  arabicName: string;
  englishName: string;
  itemTypeId: string;
}
export interface UpdateItemCategoryCommandResult extends ResultBase {}

export interface DeleteItemCategoryCommand extends DeleteCommandBase<DeleteItemCategoryCommandResult> {}

export interface DeleteItemCategoryCommandResult extends ResultBase {}

export interface DeleteItemCategoryRangeCommand extends DeleteRangeCommandBase<DeleteItemCategoryRangeCommandResult> {}

export interface DeleteItemCategoryRangeCommandResult {}

export interface GetItemCategoryQuery extends GetQueryBase<GetItemCategoryQueryResult> {}

export interface GetItemCategoryListQuery extends GetListQueryBase<GetItemCategoryListQueryResult> {}

export interface GetItemCategoryListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  itemTypeId: string;
  itemTypeArabicName: string;
  itemTypeEnglishName: string;
}

export interface GetItemCategoryQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  itemTypeId: string;
}

export class GetItemCategoryComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
  itemTypeId?: string;
}
