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
import { InventoryTransactionType } from '../enums/inventory-transaction.enums';

export interface InventoryTransactionLineDto {
  itemId: string;
  quantity: number;
  unitId: string;
  unitPrice: number;
}

export interface CreateInventoryTransactionCommand extends CreateCommandBase<CreateInventoryTransactionCommandResult> {
  inventoryTransactionType: InventoryTransactionType;
  fromWarehouseId: string | null;
  toWarehouseId: string | null;
  reason: string;

  inventoryTransactionLines: InventoryTransactionLineDto[];
}

export interface CreateInventoryTransactionCommandResult extends ResultBase {}

export interface UpdateInventoryTransactionCommand extends UpdateCommandBase<UpdateInventoryTransactionCommandResult> {
  inventoryTransactionType: InventoryTransactionType;
  fromWarehouseId: string | null;
  toWarehouseId: string | null;
  reason: string;

  inventoryTransactionLines: InventoryTransactionLineDto[];
}
export interface UpdateInventoryTransactionCommandResult extends ResultBase {}

export interface DeleteInventoryTransactionCommand extends DeleteCommandBase<DeleteInventoryTransactionCommandResult> {}

export interface DeleteInventoryTransactionCommandResult extends ResultBase {}

export interface DeleteInventoryTransactionRangeCommand extends DeleteRangeCommandBase<DeleteInventoryTransactionRangeCommandResult> {}

export interface DeleteInventoryTransactionRangeCommandResult {}

export interface GetInventoryTransactionQuery extends GetQueryBase<GetInventoryTransactionQueryResult> {}

export interface GetInventoryTransactionListQuery extends GetListQueryBase<GetInventoryTransactionListQueryResult> {
  isPosted: string | null;
  stockTransactionType: string | null;
  postedDateTimeFrom: string | null;
  postedDateTimeTo: string | null;
}

export interface GetInventoryTransactionListQueryResult extends ResultBase {
  code: number;
  inventoryTransactionType: string;
  postedDateTime: Date;
  isPosted: string;
  fromWarehouseArabicName: string;
  fromWarehouseEnglishName: string;
  toWarehouseArabicName: string;
  toWarehouseEnglishName: string;
}

export interface GetInventoryTransactionQueryResult extends ResultBase {
  code: number;
  inventoryTransactionType: string;
  postedDateTime: Date;
  isPosted: string;
  fromWarehouseId: string;
  toWarehouseId: string;
  reason: string;
  inventoryTransactionLines: InventoryTransactionLineDto[];
}

export class GetInventoryTransactionComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
