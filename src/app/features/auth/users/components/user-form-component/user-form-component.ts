import { Component, inject, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { DynamicInputConfig, FieldType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import { UserType } from '../../enums/user.enums';
import {
  GetUserQueryResult,
  CreateUserCommand,
  UpdateUserCommand,
} from '../../models/user.contracts';
import { UserService } from '../../services/user.service';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { YesNo } from 'src/app/shared/enums/common.enums';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form-component',
  imports: [BASE_FORM_RESOURCES],
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

  currentUserType = signal<string>(UserType.User);

  constructor() {
    super();
  }

  get formConfig(): DynamicInputConfig[] {
    const isEdit = this.isEdit;

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
        fieldName: 'userName',
        label: 'userName',
        validations: [ValidationHelper.EnglishName],
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
            fieldName: 'password',
            label: 'password',
            validations: [ValidationHelper.Required],
          }
        : null,

      {
        type: FieldType.Enum,
        fieldName: 'isActive',
        label: 'isActive',
        enum: YesNo,
        validations: [ValidationHelper.Required],
      },

      {
        type: FieldType.Enum,
        fieldName: 'userType',
        label: 'userType',
        enum: UserType,
        validations: [ValidationHelper.Required],
      },

      {
        type: FieldType.MultiSelect,
        fieldName: 'roleIds',
        label: 'roles',
        endpoint: 'roles',
        validations: [ValidationHelper.Required],
        visibleWhen: (form: FormGroup) => form.get('userType')?.value === UserType.User,
        validationWhen: (form: FormGroup) => form.get('userType')?.value === UserType.User,
        dependsOn: ['userType'],
      },
    ].filter(Boolean) as DynamicInputConfig[];
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
