import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseFormComponent } from '../../../../shared/components/base-components/base-form-component/base-form-component';
import { DynamicFormPageComponent } from '../../../../shared/components/dynamic-components/dynamic-form-page-component/dynamic-form-page-component';
import { DynamicInputConfig, InputType } from '../../../../shared/models/dynamic-input-config';
import { IsActive } from '../../../../shared/enums/common.enums';
import { TenantService } from '../../services/tenant.service';
import {
  CreateTenantCommand,
  UpdateTenantCommand,
  GetTenantQueryResult,
} from '../../models/tenant.contracts';

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
      fieldName: 'englishName',
      label: 'englishName',
      validations: { required: true },
    },
    {
      type: InputType.Text,
      fieldName: 'arabicName',
      label: 'arabicName',
      validations: { required: true },
    },
    {
      type: InputType.Enum,
      fieldName: 'isActive',
      label: 'isActive',
      enumData: IsActive,
      validations: { required: true },
    },
  ];
}
