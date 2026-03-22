import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetJobTitleListQuery,
  GetJobTitleListQueryResult,
  GetJobTitleQuery,
  GetJobTitleQueryResult,
  CreateJobTitleCommand,
  CreateJobTitleCommandResult,
  UpdateJobTitleCommand,
  UpdateJobTitleCommandResult,
  DeleteJobTitleCommand,
  DeleteJobTitleCommandResult,
  DeleteJobTitleRangeCommand,
  DeleteJobTitleRangeCommandResult,
} from '../models/job-title.contracts';

@Injectable({ providedIn: 'root' })
export class JobTitleService extends BaseFeatureService<
  GetJobTitleListQuery,
  GetJobTitleListQueryResult,
  GetJobTitleQuery,
  GetJobTitleQueryResult,
  CreateJobTitleCommand,
  CreateJobTitleCommandResult,
  UpdateJobTitleCommand,
  UpdateJobTitleCommandResult,
  DeleteJobTitleCommand,
  DeleteJobTitleCommandResult,
  DeleteJobTitleRangeCommand,
  DeleteJobTitleRangeCommandResult
> {
  protected override endpoint = 'job-titles';
}
