import { Injectable } from "@angular/core";
import { BaseFeatureService } from "src/app/shared/services/base-feature.service";
import { GetItemBrandListQuery, GetItemBrandListQueryResult, GetItemBrandQuery, GetItemBrandQueryResult, CreateItemBrandCommand, CreateItemBrandCommandResult, UpdateItemBrandCommand, UpdateItemBrandCommandResult, DeleteItemBrandCommand, DeleteItemBrandCommandResult, DeleteItemBrandRangeCommand, DeleteItemBrandRangeCommandResult } from "../models/item-brand.contracts";

@Injectable({ providedIn: 'root' })
export class ItemBrandService extends BaseFeatureService<
  GetItemBrandListQuery,
  GetItemBrandListQueryResult,
  GetItemBrandQuery,
  GetItemBrandQueryResult,
  CreateItemBrandCommand,
  CreateItemBrandCommandResult,
  UpdateItemBrandCommand,
  UpdateItemBrandCommandResult,
  DeleteItemBrandCommand,
  DeleteItemBrandCommandResult,
  DeleteItemBrandRangeCommand,
  DeleteItemBrandRangeCommandResult
> {
  protected override endpoint = 'item-brands';
}
