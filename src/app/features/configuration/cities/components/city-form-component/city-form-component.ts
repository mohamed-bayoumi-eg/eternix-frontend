import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { DynamicFormPageComponent } from 'src/app/shared/components/dynamic-components/dynamic-form-page-component/dynamic-form-page-component';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetCityQueryResult,
  CreateCityCommand,
  UpdateCityCommand,
} from '../../models/city.contracts';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-form-component',
  imports: [CommonModule, DynamicFormPageComponent, TranslateModule],
  templateUrl: './city-form-component.html',
  styleUrl: './city-form-component.scss',
})
export class CityFormComponent extends BaseFormComponent<
  GetCityQueryResult,
  CreateCityCommand,
  UpdateCityCommand
> {
  protected override service = inject(CityService);
  protected override listRoute = '/cities';
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
        type: InputType.Select,
        fieldName: 'countryId',
        label: 'country',
        endpoint: 'countries',
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
