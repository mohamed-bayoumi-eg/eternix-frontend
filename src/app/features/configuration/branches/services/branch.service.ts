import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import { GetBranchListQuery, GetBranchListQueryResult, GetBranchQuery, GetBranchQueryResult, CreateBranchCommand, CreateBranchCommandResult, UpdateBranchCommand, UpdateBranchCommandResult, DeleteBranchCommand, DeleteBranchCommandResult, DeleteBranchRangeCommand, DeleteBranchRangeCommandResult } from '../models/branch.contracts';



@Injectable({ providedIn: 'root' })
export class BranchService extends BaseFeatureService<
  GetBranchListQuery,
  GetBranchListQueryResult,
  GetBranchQuery,
  GetBranchQueryResult,
  CreateBranchCommand,
  CreateBranchCommandResult,
  UpdateBranchCommand,
  UpdateBranchCommandResult,
  DeleteBranchCommand,
  DeleteBranchCommandResult,
  DeleteBranchRangeCommand,
  DeleteBranchRangeCommandResult
> {
  protected override endpoint = 'branches';
}
