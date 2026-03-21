import { Component, effect, inject, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetCountryQueryResult,
  CreateCountryCommand,
  UpdateCountryCommand,
} from '../../models/country.contracts';
import { CountryService } from '../../services/country.service';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';

@Component({
  selector: 'app-country-form-component',
  imports: [BASE_FORM_RESOURCES],
  templateUrl: './country-form-component.html',
  styleUrl: './country-form-component.scss',
  standalone :true
})
export class CountryFormComponent extends BaseFormComponent<
  GetCountryQueryResult,
  CreateCountryCommand,
  UpdateCountryCommand
> {
  protected override service = inject(CountryService);
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
    ];
  }

  override handleSave(formValue: any) {
    const payload = {
      ...formValue,
    };
    super.handleSave(payload);
  }
}
