import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { DynamicFormPageComponent } from 'src/app/shared/components/dynamic-components/dynamic-form-page-component/dynamic-form-page-component';
import { IsActive } from 'src/app/shared/enums/common.enums';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetTenantQueryResult,
  CreateTenantCommand,
  UpdateTenantCommand,
} from '../../models/tenant.contracts';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-tenant-form-component',
  standalone: true,
  imports: [CommonModule, DynamicFormPageComponent],
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
        type: InputType.Enum,
        fieldName: 'isActive',
        label: 'isActive',
        enum: IsActive,
        validations: [ValidationHelper.Required],
      },
      {
        type: InputType.Text,
        fieldName: 'email',
        label: 'email',
        validations: [ValidationHelper.Email],
      },
      {
        type: InputType.Text,
        fieldName: 'phoneNumber',
        label: 'phoneNumber',
        validations: [ValidationHelper.PhoneNumber],
      },
      !isEdit
        ? {
            type: InputType.Text,
            fieldName: 'adminArabicName',
            label: 'adminArabicName',
            validations: [ValidationHelper.ArabicName],
          }
        : null,
      !isEdit
        ? {
            type: InputType.Text,
            fieldName: 'adminEnglishName',
            label: 'adminEnglishName',
            validations: [ValidationHelper.EnglishName],
          }
        : null,
      !isEdit
        ? {
            type: InputType.Text,
            fieldName: 'adminUserName',
            label: 'adminUserName',
            validations: [ValidationHelper.EnglishName],
          }
        : null,
      !isEdit
        ? {
            type: InputType.Text,
            fieldName: 'adminPassword',
            label: 'adminPassword',
            validations: [ValidationHelper.Password, ValidationHelper.Required],
          }
        : null,
    ];

    return allConfigs.filter((c) => c !== null) as DynamicInputConfig[];
  }

  get isEdit(): boolean {
    return !!this.editData()?.id;
  }
}
