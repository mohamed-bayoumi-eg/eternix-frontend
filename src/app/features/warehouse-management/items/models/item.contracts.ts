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
import { MarginType, PricingMethod } from '../enums/item.enums';

export interface ItemUnitDto {
  unitId: string;
  conversionFactor: number;
}

export interface CreateItemCommand extends CreateCommandBase<CreateItemCommandResult> {
  arabicName: string;
  englishName: string;
  itemCategoryId: string;
  itemBrandId: string | null;
  unitId: string;
  barcode: string;
  pricingMethod: PricingMethod;
  marginType: MarginType | null;
  sellingPrice: number | null;
  margin: number | null;
  hasExpiry: string;
  hasBatch: string;
  hasSerial: string;
  isActive: string;

  itemUnits: ItemUnitDto[];
}

export interface CreateItemCommandResult extends ResultBase {}

export interface UpdateItemCommand extends UpdateCommandBase<UpdateItemCommandResult> {
  arabicName: string;
  englishName: string;
  itemCategoryId: string;
  itemBrandId: string | null;
  unitId: string;
  barcode: string;
  pricingMethod: PricingMethod;
  marginType: MarginType | null;
  sellingPrice: number | null;
  margin: number | null;
  hasExpiry: string;
  hasBatch: string;
  hasSerial: string;
  isActive: string;

  itemUnits: ItemUnitDto[];
}
export interface UpdateItemCommandResult extends ResultBase {}

export interface DeleteItemCommand extends DeleteCommandBase<DeleteItemCommandResult> {}

export interface DeleteItemCommandResult extends ResultBase {}

export interface DeleteItemRangeCommand extends DeleteRangeCommandBase<DeleteItemRangeCommandResult> {}

export interface DeleteItemRangeCommandResult {}

export interface GetItemQuery extends GetQueryBase<GetItemQueryResult> {}

export interface GetItemListQuery extends GetListQueryBase<GetItemListQueryResult> {
  itemCategoryId: string | null;
  itemTypeId: string | null;
  itemBrandId: string | null;
}

export interface GetItemListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  itemTypeArabicName: string;
  itemTypeEnglishName: string;
  itemCategoryArabicName: string;
  itemCategoryEnglishName: string;
  itemBrandArabicName: string;
  itemBrandEnglishName: string;
  unitArabicName: string;
  unitEnglishName: string;
  barcode: string;
  pricingMethod: PricingMethod;
  marginType: MarginType | null;
  sellingPrice: number | null;
  margin: number | null;
  hasExpiry: string;
  hasBatch: string;
  hasSerial: string;
  isActive: string;
}

export interface GetItemQueryResult extends ResultBase {
  arabicName: string;
  englishName: string;
  itemCategoryId: string;
  itemBrandId: string | null;
  unitId: string;
  barcode: string;
  pricingMethod: PricingMethod;
  marginType: MarginType | null;
  sellingPrice: number | null;
  margin: number | null;
  hasExpiry: string;
  hasBatch: string;
  hasSerial: string;
  isActive: string;
  itemUnits: ItemUnitDto[];
}

export class GetItemComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
