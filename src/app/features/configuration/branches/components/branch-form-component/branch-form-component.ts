import { Component, inject, effect, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetBranchQueryResult,
  CreateBranchCommand,
  UpdateBranchCommand,
} from '../../models/branch.contracts';
import { BranchService } from '../../services/branch.service';
import { IsActive } from 'src/app/shared/enums/common.enums';
import { GetCityComboQuery } from '../../../cities/models/city.contracts';
import { GetAreaComboQuery } from '../../../areas/models/area.contracts';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';

@Component({
  selector: 'app-branch-form-component',
  imports: [BASE_FORM_RESOURCES],
  templateUrl: './branch-form-component.html',
  styleUrl: './branch-form-component.scss',
  standalone: true,
})
export class BranchFormComponent extends BaseFormComponent<
  GetBranchQueryResult,
  CreateBranchCommand,
  UpdateBranchCommand
> {
  protected override service = inject(BranchService);
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
        fieldName: 'phoneNumber',
        label: 'phoneNumber',
        validations: [ValidationHelper.PhoneNumber],
      },
      {
        type: InputType.Text,
        fieldName: 'email',
        label: 'email',
        validations: [ValidationHelper.Email],
      },
      {
        type: InputType.Select,
        fieldName: 'userId',
        label: 'branchManager',
        endpoint: 'users',
        validations: [ValidationHelper.Required],
      },
      {
        type: InputType.Select,
        fieldName: 'countryId',
        label: 'country',
        endpoint: 'countries',
        validations: [ValidationHelper.Required],
      },
      {
        type: InputType.Select,
        fieldName: 'cityId',
        label: 'city',
        endpoint: 'cities',
        queryModel: GetCityComboQuery,
        validations: [ValidationHelper.Required],
      },
      {
        type: InputType.Select,
        fieldName: 'areaId',
        label: 'area',
        endpoint: 'areas',
        queryModel: GetAreaComboQuery,
        validations: [ValidationHelper.Required],
      },
      {
        type: InputType.Text,
        fieldName: 'address',
        label: 'address',
        validations: [ValidationHelper.Address],
      },
      {
        type: InputType.Enum,
        fieldName: 'isActive',
        label: 'isActive',
        enum: IsActive,
        validations: [ValidationHelper.Required],
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
