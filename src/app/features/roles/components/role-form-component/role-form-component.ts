import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { BaseFormComponent } from '../../../../shared/components/base-components/base-form-component/base-form-component';
import { DynamicFormPageComponent } from '../../../../shared/components/dynamic-components/dynamic-form-page-component/dynamic-form-page-component';
import { DynamicInputConfig, InputType } from '../../../../shared/models/dynamic-input-config';
import { ValidationHelper } from '../../../../shared/utils/validation-helper';
import {
  GetRoleQueryResult,
  CreateRoleCommand,
  UpdateRoleCommand,
  RolePermissionDto,
} from '../../models/role.contracts';
import { RoleService } from '../../services/role.service';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicDetailsTableComponent } from 'src/app/shared/components/dynamic-components/dynamic-details-table-component/dynamic-details-table-component';
import { PermissionType } from '../../enums/role.enums';

@Component({
  selector: 'app-role-form-component',
  imports: [CommonModule, DynamicFormPageComponent, TranslateModule, DynamicDetailsTableComponent],
  templateUrl: './role-form-component.html',
  styleUrl: './role-form-component.scss',
  standalone: true,
})
export class RoleFormComponent extends BaseFormComponent<
  GetRoleQueryResult,
  CreateRoleCommand,
  UpdateRoleCommand
> {
  protected override service = inject(RoleService);
  protected override listRoute = '/roles';

  selectedPermissions = signal<RolePermissionDto[]>([]);
  formConfig: DynamicInputConfig[] = [
    {
      type: InputType.Text,
      fieldName: 'arabicName',
      label: 'arabicName',
      validations: [ValidationHelper.Required],
    },
    {
      type: InputType.Text,
      fieldName: 'englishName',
      label: 'englishName',
      validations: [ValidationHelper.Required],
    },
    {
      type: InputType.TextArea,
      fieldName: 'description',
      label: 'description',
    },
  ];
  permissionFormConfig: any[] = [
    {
      fieldName: 'screenId',
      label: 'screen',
      type: 'select',
      endpoint: 'screens',
      validations: [ValidationHelper.Required],
    },
    {
      type: InputType.Enum,
      fieldName: 'permissionType',
      label: 'permissionType',
      enum: PermissionType,
      validations: [ValidationHelper.Required],
    },
  ];

  tabsConfig = [
    { label: 'permissions', columns: this.permissionFormConfig, data: this.selectedPermissions },
  ];

  get tabLabels() {
    return this.tabsConfig.map((t) => t.label);
  }

  addPermission() {
    const newPermission: RolePermissionDto = {
      screenId: 0,
      permissionType: PermissionType.Undefined,
    };
    this.selectedPermissions.update((prev) => [...prev, newPermission]);
  }

  removePermission(index: number) {
    this.selectedPermissions.update((prev) => prev.filter((_, i) => i !== index));
  }

  updatePermission(index: number, field: string, event: any) {
    const val = event.target.value;
    const current = [...this.selectedPermissions()];
    (current[index] as any)[field] = val;
    this.selectedPermissions.set(current);
  }
  override handleSave(formValue: any) {
    const payload = {
      ...formValue,
      permissions: this.selectedPermissions(),
    };
    super.handleSave(payload);
  }
}
