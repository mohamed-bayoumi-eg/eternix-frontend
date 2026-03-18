import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetAreasListQuery,
  GetAreaListQueryResult,
  GetAreaQuery,
  GetAreaQueryResult,
  CreateAreaCommand,
  CreateAreaCommandResult,
  UpdateAreaCommand,
  UpdateAreaCommandResult,
  DeleteAreaCommand,
  DeleteAreaCommandResult,
  DeleteAreasRangeCommand,
  DeleteAreasRangeCommandResult,
} from '../models/area.contracts';

@Injectable({ providedIn: 'root' })
export class AreaService extends BaseFeatureService<
  GetAreasListQuery,
  GetAreaListQueryResult,
  GetAreaQuery,
  GetAreaQueryResult,
  CreateAreaCommand,
  CreateAreaCommandResult,
  UpdateAreaCommand,
  UpdateAreaCommandResult,
  DeleteAreaCommand,
  DeleteAreaCommandResult,
  DeleteAreasRangeCommand,
  DeleteAreasRangeCommandResult
> {
  protected override endpoint = 'areas';
}
