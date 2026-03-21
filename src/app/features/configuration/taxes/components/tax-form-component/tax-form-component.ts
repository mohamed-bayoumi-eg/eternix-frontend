import { Component, effect, inject, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import { GetTaxQueryResult, CreateTaxCommand, UpdateTaxCommand } from '../../models/tax.contracts';
import { TaxService } from '../../services/tax.service';
import { TaxType } from '../../enums/tax.enums';
import { IsActive } from 'src/app/shared/enums/common.enums';

@Component({
  selector: 'app-tax-form-component',
  imports: [BASE_FORM_RESOURCES],
  templateUrl: './tax-form-component.html',
  styleUrl: './tax-form-component.scss',
  standalone: true,
})
export class TaxFormComponent extends BaseFormComponent<
  GetTaxQueryResult,
  CreateTaxCommand,
  UpdateTaxCommand
> {
  protected override service = inject(TaxService);
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
        type: InputType.Number,
        fieldName: 'percentage',
        label: 'percentage',
        validations: [ValidationHelper.Percentage],
      },
      {
        type: InputType.Text,
        fieldName: 'taxAuthorityCode',
        label: 'taxAuthorityCode',
        validations: [ValidationHelper.Code],
      },
      {
        type: InputType.Enum,
        fieldName: 'taxType',
        label: 'taxType',
        enum: TaxType,
        validations: [ValidationHelper.Required],
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
