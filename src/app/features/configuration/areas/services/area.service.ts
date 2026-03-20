import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetAreaListQuery,
  GetAreaListQueryResult,
  GetAreaQuery,
  GetAreaQueryResult,
  CreateAreaCommand,
  CreateAreaCommandResult,
  UpdateAreaCommand,
  UpdateAreaCommandResult,
  DeleteAreaCommand,
  DeleteAreaCommandResult,
  DeleteAreaRangeCommand,
  DeleteAreaRangeCommandResult,
} from '../models/area.contracts';

@Injectable({ providedIn: 'root' })
export class AreaService extends BaseFeatureService<
  GetAreaListQuery,
  GetAreaListQueryResult,
  GetAreaQuery,
  GetAreaQueryResult,
  CreateAreaCommand,
  CreateAreaCommandResult,
  UpdateAreaCommand,
  UpdateAreaCommandResult,
  DeleteAreaCommand,
  DeleteAreaCommandResult,
  DeleteAreaRangeCommand,
  DeleteAreaRangeCommandResult
> {
  protected override endpoint = 'areas';
}
