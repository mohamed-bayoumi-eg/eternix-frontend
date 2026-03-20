import { Component, inject, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { IsActive } from 'src/app/shared/enums/common.enums';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import { UserType } from '../../enums/user.enums';
import {
  GetUserQueryResult,
  CreateUserCommand,
  UpdateUserCommand,
} from '../../models/user.contracts';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicFormPageComponent } from 'src/app/shared/components/dynamic-components/dynamic-form-page-component/dynamic-form-page-component';

@Component({
  selector: 'app-user-form-component',
  standalone: true,
  imports: [CommonModule, DynamicFormPageComponent, TranslateModule],
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.scss',
})
export class UserFormComponent extends BaseFormComponent<
  GetUserQueryResult,
  CreateUserCommand,
  UpdateUserCommand
> {
  protected override service = inject(UserService);

  currentUserType = signal<string>(UserType.User);

  constructor() {
    super();
  }

  get formConfig(): DynamicInputConfig[] {
    const isEdit = this.isEdit;
    const userType = this.currentUserType();

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

      !isEdit
        ? {
            type: InputType.Text,
            fieldName: 'password',
            label: 'password',
            validations: [ValidationHelper.Password],
          }
        : null,

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

      userType === UserType.User
        ? {
            type: InputType.MultiSelect,
            fieldName: 'roleIds',
            label: 'roles',
            endpoint: 'roles',
            validations: [ValidationHelper.Required],
            span: 6,
          }
        : null,
    ];

    return allConfigs.filter((c) => c !== null) as DynamicInputConfig[];
  }

  protected override afterDataLoaded(data: any): void {
    if (data.userType) {
      this.currentUserType.set(data.userType);
    }
  }

  onValueChange(event: { field: string; value: any }) {
    if (event.field === 'userType') {
      this.currentUserType.set(event.value);
    }
  }
  get isEdit(): boolean {
    return !!this.editData()?.id;
  }
}
