import { Component, effect, inject, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { DynamicInputConfig, FieldType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetCurrencyQueryResult,
  CreateCurrencyCommand,
  UpdateCurrencyCommand,
} from '../../models/currency.contracts';
import { CurrencyService } from '../../services/currency.service';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';

@Component({
  selector: 'app-currency-form-component',
  imports: [BASE_FORM_RESOURCES],
  templateUrl: './currency-form-component.html',
  styleUrl: './currency-form-component.scss',
  standalone: true,
})
export class CurrencyFormComponent extends BaseFormComponent<
  GetCurrencyQueryResult,
  CreateCurrencyCommand,
  UpdateCurrencyCommand
> {
  protected override service = inject(CurrencyService);
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
        fieldName: 'isoCode',
        label: 'isoCode',
        validations: [ValidationHelper.Code, ValidationHelper.Required],
      },
      {
        type: FieldType.Text,
        fieldName: 'symbol',
        label: 'symbol',
        validations: [ValidationHelper.Code, ValidationHelper.Required],
      },
      {
        type: FieldType.Text,
        fieldName: 'arabicSubUnitName',
        label: 'arabicSubUnitName',
        validations: [ValidationHelper.ArabicName],
      },
      {
        type: FieldType.Text,
        fieldName: 'englishSubUnitName',
        label: 'englishSubUnitName',
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
