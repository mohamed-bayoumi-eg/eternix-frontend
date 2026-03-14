import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { DynamicDetailsTableComponent } from 'src/app/shared/components/dynamic-components/dynamic-details-table-component/dynamic-details-table-component';
import { DynamicFormPageComponent } from 'src/app/shared/components/dynamic-components/dynamic-form-page-component/dynamic-form-page-component';
import { DynamicDetailsTableConfig } from 'src/app/shared/models/dynamic-details-table-config';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import { UserService } from '../../services/user.service';
import {
  CreateUserCommand,
  GetUserQueryResult,
  UpdateUserCommand,
  UserRoleDto,
} from '../../models/user.contracts';
import { IsActive } from 'src/app/shared/enums/common.enums';
import { UserType } from '../../enums/user.enums';

@Component({
  selector: 'app-user-form-component',
  imports: [CommonModule, DynamicFormPageComponent, TranslateModule, DynamicDetailsTableComponent],
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.scss',
  standalone: true,
})
export class UserFormComponent extends BaseFormComponent<
  GetUserQueryResult,
  CreateUserCommand,
  UpdateUserCommand
> {
  protected override service = inject(UserService);
  protected override listRoute = '/users';
  constructor() {
    super();
    effect(() => {
      const data = this.editData();
      if (data && data.userRoles) {
        this.selectedUserRoles.set([...data.userRoles]);
      } else {
        this.selectedUserRoles.set([]);
      }
    });
  }
  isTableValid = signal(false);

  selectedUserRoles = signal<UserRoleDto[]>([]);

  formConfig: DynamicInputConfig[] = [
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
      fieldName: 'userName',
      label: 'userName',
      validations: [ValidationHelper.EnglishName],
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
    {
      type: InputType.Text,
      fieldName: 'password',
      label: 'password',
      validations: this.editData()?.id ? [] : [ValidationHelper.Password],
    },
    {
      type: InputType.Enum,
      fieldName: 'isActive',
      label: 'isActive',
      enum: IsActive,
      validations: [ValidationHelper.Required],
    },
    {
      type: InputType.Enum,
      fieldName: 'userType',
      label: 'userType',
      enum: UserType,
      validations: [ValidationHelper.Required],
    },
  ];
  userRoleFormConfig: DynamicInputConfig[] = [
    {
      type: InputType.Select,
      fieldName: 'roleId',
      label: 'role',
      endpoint: 'roles',
      validations: [ValidationHelper.Required],
      span: 6,
    },
  ];

  tabsConfig: DynamicDetailsTableConfig[] = [
    {
      title: 'userRoles',
      columns: this.userRoleFormConfig,
      data: this.selectedUserRoles,
      required: true,
      showAddBtn: true,
      showDeleteBtn: true,
    },
  ];

  get tabLabels() {
    return this.tabsConfig.map((t) => t.title);
  }

  addUserRole() {
    const newUserRole: UserRoleDto = {
      roleId: '0',
    };
    this.selectedUserRoles.update((prev) => [...prev, newUserRole]);
  }

  removeUserRole(index: number) {
    this.selectedUserRoles.update((prev) => prev.filter((_, i) => i !== index));
  }

  updateUserRole(index: number, field: string, event: any) {
    const val = event.target.value;
    const current = [...this.selectedUserRoles()];
    (current[index] as any)[field] = val;
    this.selectedUserRoles.set(current);
  }
  override handleSave(formValue: any) {
    const payload = {
      ...formValue,
      userRoles: this.selectedUserRoles(),
    };
    super.handleSave(payload);
  }
}
