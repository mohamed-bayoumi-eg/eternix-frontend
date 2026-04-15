import { Component, inject, effect, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { DynamicInputConfig, FieldType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetEmployeeQueryResult,
  CreateEmployeeCommand,
  UpdateEmployeeCommand,
} from '../../models/employee.contracts';
import { EmployeeService } from '../../services/employee.service';
import { YesNo } from 'src/app/shared/enums/common.enums';

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
        type: FieldType.Text,
        fieldName: 'arabicName',
        label: 'arabicName',
        validations: [ValidationHelper.ArabicName],
      },
      {
        type: FieldType.Text,
        fieldName: 'englishName',
        label: 'englishName',
        validations: [ValidationHelper.EnglishName],
      },
      {
        type: FieldType.Text,
        fieldName: 'employeeCode',
        label: 'employeeCode',
        validations: [ValidationHelper.Code, ValidationHelper.Required],
      },
      {
        type: FieldType.Select,
        fieldName: 'departmentId',
        label: 'department',
        endpoint: 'departments',
        validations: [ValidationHelper.Required],
      },
      {
        type: FieldType.Select,
        fieldName: 'jobTitleId',
        label: 'jobTitle',
        endpoint: 'job-titles',
        validations: [ValidationHelper.Required],
      },
      {
        type: FieldType.Select,
        fieldName: 'branchId',
        label: 'branch',
        endpoint: 'branches',
        validations: [ValidationHelper.Required],
      },
      {
        type: FieldType.Select,
        fieldName: 'userId',
        label: 'user',
        endpoint: 'users',
      },
      {
        type: FieldType.Date,
        fieldName: 'hireDate',
        label: 'hireDate',
        validations: [ValidationHelper.Required],
      },
      {
        type: FieldType.MultiSelect,
        fieldName: 'otherBranchIds',
        label: 'otherBranches',
        endpoint: 'branches',
      },
      {
        type: FieldType.Enum,
        fieldName: 'isActive',
        label: 'isActive',
        enum: YesNo,
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
