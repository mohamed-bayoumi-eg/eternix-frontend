import { Component, inject } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { DynamicInputConfig, FieldType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetTenantQueryResult,
  CreateTenantCommand,
  UpdateTenantCommand,
} from '../../models/tenant.contracts';
import { TenantService } from '../../services/tenant.service';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { YesNo } from 'src/app/shared/enums/common.enums';

@Component({
  selector: 'app-tenant-form-component',
  standalone: true,
  imports: [BASE_FORM_RESOURCES],
  templateUrl: './tenant-form-component.html',
  styleUrl: './tenant-form-component.scss',
})
export class TenantFormComponent extends BaseFormComponent<
  GetTenantQueryResult,
  CreateTenantCommand,
  UpdateTenantCommand
> {
  protected override service = inject(TenantService);

  get formConfig(): DynamicInputConfig[] {
    const isEdit = this.isEdit;

    const allConfigs: (DynamicInputConfig | null)[] = [
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
        type: FieldType.Enum,
        fieldName: 'isActive',
        label: 'isActive',
        enum: YesNo,
        validations: [ValidationHelper.Required],
      },
      {
        type: FieldType.Text,
        fieldName: 'email',
        label: 'email',
        validations: [ValidationHelper.Email],
      },
      {
        type: FieldType.Text,
        fieldName: 'phoneNumber',
        label: 'phoneNumber',
        validations: [ValidationHelper.PhoneNumber],
      },
      !isEdit
        ? {
            type: FieldType.Text,
            fieldName: 'adminArabicName',
            label: 'adminArabicName',
            validations: [ValidationHelper.ArabicName],
          }
        : null,
      !isEdit
        ? {
            type: FieldType.Text,
            fieldName: 'adminEnglishName',
            label: 'adminEnglishName',
            validations: [ValidationHelper.EnglishName],
          }
        : null,
      !isEdit
        ? {
            type: FieldType.Text,
            fieldName: 'adminUserName',
            label: 'adminUserName',
            validations: [ValidationHelper.EnglishName],
          }
        : null,
      !isEdit
        ? {
            type: FieldType.Text,
            fieldName: 'adminPassword',
            label: 'adminPassword',
            validations: [/*ValidationHelper.Password,*/ ValidationHelper.Required],
          }
        : null,
    ];

    return allConfigs.filter((c) => c !== null) as DynamicInputConfig[];
  }

  get isEdit(): boolean {
    return !!this.editData()?.id;
  }
}
