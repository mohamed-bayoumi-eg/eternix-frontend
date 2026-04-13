import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetItemTypeListQueryResult,
  CreateItemTypeCommand,
  CreateItemTypeCommandResult,
  DeleteItemTypeCommand,
  DeleteItemTypeCommandResult,
  DeleteItemTypeRangeCommand,
  DeleteItemTypeRangeCommandResult,
  GetItemTypeListQuery,
  GetItemTypeQuery,
  GetItemTypeQueryResult,
  UpdateItemTypeCommand,
  UpdateItemTypeCommandResult,
} from '../models/item-type.contracts';

@Injectable({ providedIn: 'root' })
export class ItemTypeService extends BaseFeatureService<
  GetItemTypeListQuery,
  GetItemTypeListQueryResult,
  GetItemTypeQuery,
  GetItemTypeQueryResult,
  CreateItemTypeCommand,
  CreateItemTypeCommandResult,
  UpdateItemTypeCommand,
  UpdateItemTypeCommandResult,
  DeleteItemTypeCommand,
  DeleteItemTypeCommandResult,
  DeleteItemTypeRangeCommand,
  DeleteItemTypeRangeCommandResult
> {
  protected override endpoint = 'item-types';
}
