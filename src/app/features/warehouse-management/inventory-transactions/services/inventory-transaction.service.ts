import { Injectable } from "@angular/core";
import { BaseFeatureService } from "src/app/shared/services/base-feature.service";
import { GetInventoryTransactionListQuery, GetInventoryTransactionListQueryResult, GetInventoryTransactionQuery, GetInventoryTransactionQueryResult, CreateInventoryTransactionCommand, CreateInventoryTransactionCommandResult, UpdateInventoryTransactionCommand, UpdateInventoryTransactionCommandResult, DeleteInventoryTransactionCommand, DeleteInventoryTransactionCommandResult, DeleteInventoryTransactionRangeCommand, DeleteInventoryTransactionRangeCommandResult } from "../models/inventory-transaction.contracts";


@Injectable({ providedIn: 'root' })
export class InventoryTransactionService extends BaseFeatureService<
  GetInventoryTransactionListQuery,
  GetInventoryTransactionListQueryResult,
  GetInventoryTransactionQuery,
  GetInventoryTransactionQueryResult,
  CreateInventoryTransactionCommand,
  CreateInventoryTransactionCommandResult,
  UpdateInventoryTransactionCommand,
  UpdateInventoryTransactionCommandResult,
  DeleteInventoryTransactionCommand,
  DeleteInventoryTransactionCommandResult,
  DeleteInventoryTransactionRangeCommand,
  DeleteInventoryTransactionRangeCommandResult
> {
  protected override endpoint = 'inventory-transactions';
}
