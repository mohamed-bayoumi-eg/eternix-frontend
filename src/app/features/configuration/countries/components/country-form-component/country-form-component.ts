import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { DynamicFormPageComponent } from 'src/app/shared/components/dynamic-components/dynamic-form-page-component/dynamic-form-page-component';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetCountryQueryResult,
  CreateCountryCommand,
  UpdateCountryCommand,
} from '../../models/country.contracts';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-form-component',
  imports: [CommonModule, DynamicFormPageComponent, TranslateModule],

  templateUrl: './country-form-component.html',
  styleUrl: './country-form-component.scss',
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
