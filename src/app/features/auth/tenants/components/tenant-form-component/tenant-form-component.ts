import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { DynamicFormPageComponent } from 'src/app/shared/components/dynamic-components/dynamic-form-page-component/dynamic-form-page-component';
import { IsActive } from 'src/app/shared/enums/common.enums';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import { GetTenantQueryResult, CreateTenantCommand, UpdateTenantCommand } from '../../models/tenant.contracts';
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

  protected override listRoute = '/tenants';

  formConfig: DynamicInputConfig[] = [
    {
      type: InputType.Text,
      fieldName: 'arabicName',
      label: 'arabicName',
      validations: [ValidationHelper.ArabicName],
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
      fieldName: 'englishName',
      label: 'englishName',
      validations: [ValidationHelper.EnglishName],
    },
  ];
}
