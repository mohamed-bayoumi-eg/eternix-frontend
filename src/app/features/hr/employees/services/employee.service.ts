import { Injectable } from '@angular/core';
import { BaseFeatureService } from 'src/app/shared/services/base-feature.service';
import {
  GetEmployeeListQuery,
  GetEmployeeListQueryResult,
  GetEmployeeQuery,
  GetEmployeeQueryResult,
  CreateEmployeeCommand,
  CreateEmployeeCommandResult,
  UpdateEmployeeCommand,
  UpdateEmployeeCommandResult,
  DeleteEmployeeCommand,
  DeleteEmployeeCommandResult,
  DeleteEmployeeRangeCommand,
  DeleteEmployeeRangeCommandResult,
} from '../models/employee.contracts';

@Injectable({ providedIn: 'root' })
export class EmployeeService extends BaseFeatureService<
  GetEmployeeListQuery,
  GetEmployeeListQueryResult,
  GetEmployeeQuery,
  GetEmployeeQueryResult,
  CreateEmployeeCommand,
  CreateEmployeeCommandResult,
  UpdateEmployeeCommand,
  UpdateEmployeeCommandResult,
  DeleteEmployeeCommand,
  DeleteEmployeeCommandResult,
  DeleteEmployeeRangeCommand,
  DeleteEmployeeRangeCommandResult
> {
  protected override endpoint = 'employees';
}
