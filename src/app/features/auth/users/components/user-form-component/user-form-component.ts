import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { DynamicFormPageComponent } from 'src/app/shared/components/dynamic-components/dynamic-form-page-component/dynamic-form-page-component';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import { UserService } from '../../services/user.service';
import {
  CreateUserCommand,
  GetUserQueryResult,
  UpdateUserCommand,
} from '../../models/user.contracts';
import { IsActive } from 'src/app/shared/enums/common.enums';
import { UserType } from '../../enums/user.enums';

@Component({
  selector: 'app-user-form-component',
  imports: [CommonModule, DynamicFormPageComponent, TranslateModule],
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
    });
  }
  isTableValid = signal(false);

  get formConfig(): DynamicInputConfig[] {
    return [
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
        validations: this.editData()?.id
          ? [ValidationHelper.Password]
          : [ValidationHelper.Password],
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
      {
        type: InputType.MultiSelect,
        fieldName: 'roleIds',
        label: 'roles',
        endpoint: 'roles',
        validations: [ValidationHelper.Required],
        span: 6,
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
