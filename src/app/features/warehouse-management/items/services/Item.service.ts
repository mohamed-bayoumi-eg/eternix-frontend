import { Injectable } from "@angular/core";
import { BaseFeatureService } from "src/app/shared/services/base-feature.service";
import { GetItemListQueryResult, GetItemQuery, GetItemQueryResult, CreateItemCommand, CreateItemCommandResult, UpdateItemCommand, UpdateItemCommandResult, DeleteItemCommand, DeleteItemCommandResult, DeleteItemRangeCommand, DeleteItemRangeCommandResult, GetItemListQuery } from "../models/item.contracts";


@Injectable({ providedIn: 'root' })
export class ItemService extends BaseFeatureService<
  GetItemListQuery,
  GetItemListQueryResult,
  GetItemQuery,
  GetItemQueryResult,
  CreateItemCommand,
  CreateItemCommandResult,
  UpdateItemCommand,
  UpdateItemCommandResult,
  DeleteItemCommand,
  DeleteItemCommandResult,
  DeleteItemRangeCommand,
  DeleteItemRangeCommandResult
> {
  protected override endpoint = 'items';
}
