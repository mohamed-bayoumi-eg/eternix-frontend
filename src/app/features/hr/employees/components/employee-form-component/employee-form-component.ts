import { Component, inject, effect, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { IsActive } from 'src/app/shared/enums/common.enums';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetEmployeeQueryResult,
  CreateEmployeeCommand,
  UpdateEmployeeCommand,
} from '../../models/employee.contracts';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form-component',
  imports: [BASE_FORM_RESOURCES],
  templateUrl: './employee-form-component.html',
  styleUrl: './employee-form-component.scss',
  standalone: true,
})
export class EmployeeFormComponent extends BaseFormComponent<
  GetEmployeeQueryResult,
  CreateEmployeeCommand,
  UpdateEmployeeCommand
> {
  protected override service = inject(EmployeeService);
  constructor() {
    super();
    effect(() => {
      const data = this.editData();
    });
  }
  isTableValid = signal(false);

  get formConfig(): DynamicInputConfig[] {
    return [
      {
        type: InputType.Text,
        fieldName: 'arabicName',
        label: 'arabicName',
        validations: [ValidationHelper.ArabicName],
      },
      {
        type: InputType.Text,
        fieldName: 'englishName',
        label: 'englishName',
        validations: [ValidationHelper.EnglishName],
      },
      {
        type: InputType.Text,
        fieldName: 'employeeCode',
        label: 'employeeCode',
        validations: [ValidationHelper.Code, ValidationHelper.Required],
      },
      {
        type: InputType.Select,
        fieldName: 'departmentId',
        label: 'department',
        endpoint: 'departments',
        validations: [ValidationHelper.Required],
      },
      {
        type: InputType.Select,
        fieldName: 'jobTitleId',
        label: 'jobTitle',
        endpoint: 'job-titles',
        validations: [ValidationHelper.Required],
      },
      {
        type: InputType.Select,
        fieldName: 'branchId',
        label: 'branch',
        endpoint: 'branches',
        validations: [ValidationHelper.Required],
      },
      {
        type: InputType.Select,
        fieldName: 'userId',
        label: 'user',
        endpoint: 'users',
      },
      {
        type: InputType.Date,
        fieldName: 'hireDate',
        label: 'hireDate',
        validations: [ValidationHelper.Required],
      },
      {
        type: InputType.MultiSelect,
        fieldName: 'otherBranchIds',
        label: 'otherBranches',
        endpoint: 'branches',
      },
      {
        type: InputType.Enum,
        fieldName: 'isActive',
        label: 'isActive',
        enum: IsActive,
        validations: [ValidationHelper.Required],
      },
    ];
  }

  override handleSave(formValue: any) {
    const payload = {
      ...formValue,
    };
    super.handleSave(payload);
  }
}
