import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';

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
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { DynamicFormPageComponent } from 'src/app/shared/components/dynamic-components/dynamic-form-page-component/dynamic-form-page-component';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import { DynamicDetailsTableConfig } from 'src/app/shared/models/dynamic-details-table-config';

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
  constructor() {
    super();
    effect(() => {
      const data = this.editData();
      if (data && data.permissions) {
        this.selectedPermissions.set([...data.permissions]);
      } else {
        this.selectedPermissions.set([]);
      }
    });
  }
  isTableValid = signal(false);

  selectedPermissions = signal<RolePermissionDto[]>([]);
  readonly formConfig: DynamicInputConfig[] = [
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
      type: InputType.TextArea,
      fieldName: 'description',
      label: 'description',
    },
  ];
  readonly permissionFormConfig: DynamicInputConfig[] = [
    {
      type: InputType.Select,
      fieldName: 'screenId',
      label: 'screen',
      endpoint: 'screens',
      validations: [ValidationHelper.Required],
      span: 6,
    },
    {
      type: InputType.Enum,
      fieldName: 'permissionType',
      label: 'permissionType',
      enum: PermissionType,
      validations: [ValidationHelper.Required],
    },
  ];

  tabsConfig: DynamicDetailsTableConfig[] = [
    {
      title: 'permissions',
      columns: this.permissionFormConfig,
      data: this.selectedPermissions,
      required: true,
      showAddBtn: true,
      showDeleteBtn: true,
    },
  ];

  get tabLabels() {
    return this.tabsConfig.map((t) => t.title);
  }

  addPermission() {
    const newPermission: RolePermissionDto = {
      screenId: '0',
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
  protected override afterDataLoaded(data: GetRoleQueryResult): void {
    if (data && data.permissions) {
      this.selectedPermissions.set([...data.permissions]);
    } else {
      this.selectedPermissions.set([]);
    }
  }
}
