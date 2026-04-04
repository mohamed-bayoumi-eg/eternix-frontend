import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetItemCategoryListQuery,
  GetItemCategoryListQueryResult,
  GetItemCategoryQuery,
  GetItemCategoryQueryResult,
  CreateItemCategoryCommand,
  CreateItemCategoryCommandResult,
  UpdateItemCategoryCommand,
  UpdateItemCategoryCommandResult,
  DeleteItemCategoryCommand,
  DeleteItemCategoryCommandResult,
  DeleteItemCategoryRangeCommand,
  DeleteItemCategoryRangeCommandResult,
} from '../../../warehouse-management/item-categories/models/item-category.contracts';

@Injectable({ providedIn: 'root' })
export class ItemCategoryService extends BaseFeatureService<
  GetItemCategoryListQuery,
  GetItemCategoryListQueryResult,
  GetItemCategoryQuery,
  GetItemCategoryQueryResult,
  CreateItemCategoryCommand,
  CreateItemCategoryCommandResult,
  UpdateItemCategoryCommand,
  UpdateItemCategoryCommandResult,
  DeleteItemCategoryCommand,
  DeleteItemCategoryCommandResult,
  DeleteItemCategoryRangeCommand,
  DeleteItemCategoryRangeCommandResult
> {
  protected override endpoint = 'item-categories';
}
