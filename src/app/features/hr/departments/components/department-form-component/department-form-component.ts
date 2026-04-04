import { Component, effect, inject, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { IsActive } from 'src/app/shared/enums/common.enums';
import { DynamicInputConfig, FieldType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetDepartmentQueryResult,
  CreateDepartmentCommand,
  UpdateDepartmentCommand,
} from '../../models/department.contracts';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-form-component',
  imports: [BASE_FORM_RESOURCES],
  templateUrl: './department-form-component.html',
  styleUrl: './department-form-component.scss',
  standalone: true,
})
export class DepartmentFormComponent extends BaseFormComponent<
  GetDepartmentQueryResult,
  CreateDepartmentCommand,
  UpdateDepartmentCommand
> {
  protected override service = inject(DepartmentService);
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
        type: FieldType.Select,
        fieldName: 'parentDepartmentId',
        label: 'parentDepartment',
        endpoint: 'departments',
      },
      {
        type: FieldType.Select,
        fieldName: 'managerId',
        label: 'departmentManager',
        endpoint: 'employees',
      },
      {
        type: FieldType.Enum,
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
