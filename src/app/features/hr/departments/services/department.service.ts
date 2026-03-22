import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetDepartmentListQuery,
  GetDepartmentListQueryResult,
  GetDepartmentQuery,
  GetDepartmentQueryResult,
  CreateDepartmentCommand,
  CreateDepartmentCommandResult,
  UpdateDepartmentCommand,
  UpdateDepartmentCommandResult,
  DeleteDepartmentCommand,
  DeleteDepartmentCommandResult,
  DeleteDepartmentRangeCommand,
  DeleteDepartmentRangeCommandResult,
} from '../models/department.contracts';

@Injectable({ providedIn: 'root' })
export class DepartmentService extends BaseFeatureService<
  GetDepartmentListQuery,
  GetDepartmentListQueryResult,
  GetDepartmentQuery,
  GetDepartmentQueryResult,
  CreateDepartmentCommand,
  CreateDepartmentCommandResult,
  UpdateDepartmentCommand,
  UpdateDepartmentCommandResult,
  DeleteDepartmentCommand,
  DeleteDepartmentCommandResult,
  DeleteDepartmentRangeCommand,
  DeleteDepartmentRangeCommandResult
> {
  protected override endpoint = 'departments';
}
