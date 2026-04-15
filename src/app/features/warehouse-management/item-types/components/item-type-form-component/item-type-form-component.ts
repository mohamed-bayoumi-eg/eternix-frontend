import { Component, inject, effect, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { DynamicInputConfig, FieldType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetItemTypeQueryResult,
  CreateItemTypeCommand,
  UpdateItemTypeCommand,
} from '../../models/item-type.contracts';
import { ItemTypeService } from '../../services/item-type.service';

@Component({
  selector: 'app-item-type-form-component',
  templateUrl: './item-type-form-component.html',
  styleUrl: './item-type-form-component.scss',
  imports: [BASE_FORM_RESOURCES],
  standalone: true,
})
export class ItemTypeFormComponent extends BaseFormComponent<
  GetItemTypeQueryResult,
  CreateItemTypeCommand,
  UpdateItemTypeCommand
> {
  protected override service = inject(ItemTypeService);
  constructor() {
    super();
    effect(() => {
      this.editData();
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
        type: FieldType.MultiSelect,
        fieldName: 'taxIds',
        label: 'taxes',
        endpoint: 'taxes',
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
