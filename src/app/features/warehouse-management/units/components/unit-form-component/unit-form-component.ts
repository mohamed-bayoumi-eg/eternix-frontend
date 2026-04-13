import { Component, effect, inject, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { DynamicInputConfig, FieldType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import { UnitType } from '../../enums/unit.enums';
import {
  GetUnitQueryResult,
  CreateUnitCommand,
  UpdateUnitCommand,
} from '../../models/unit.contracts';
import { UnitService } from '../../services/unit.service';
import { IsActive } from 'src/app/shared/enums/common.enums';

@Component({
  selector: 'app-unit-form-component',
  imports: [BASE_FORM_RESOURCES],
  templateUrl: './unit-form-component.html',
  styleUrl: './unit-form-component.scss',
  standalone: true,
})
export class UnitFormComponent extends BaseFormComponent<
  GetUnitQueryResult,
  CreateUnitCommand,
  UpdateUnitCommand
> {
  protected override service = inject(UnitService);
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
        fieldName: 'symbol',
        label: 'symbol',
        validations: [ValidationHelper.Code, ValidationHelper.Required],
      },
      {
        type: FieldType.Text,
        fieldName: 'globalUnitCode',
        label: 'globalUnitCode',
        validations: [ValidationHelper.Code],
      },
      {
        type: FieldType.Enum,
        fieldName: 'unitType',
        label: 'unitType',
        enum: UnitType,
        validations: [ValidationHelper.Required],
      },
      {
        type: FieldType.Enum,
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
