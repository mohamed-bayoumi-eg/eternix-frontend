import { Component, effect, inject, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { DynamicInputConfig, FieldType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetItemCategoryQueryResult,
  CreateItemCategoryCommand,
  UpdateItemCategoryCommand,
} from '../../models/item-category.contracts';
import { ItemCategoryService } from '../../services/item-category.service';

@Component({
  selector: 'app-item-category-form-component',
  imports: [BASE_FORM_RESOURCES],
  templateUrl: './item-category-form-component.html',
  styleUrl: './item-category-form-component.scss',
  standalone: true,
})
export class ItemCategoryFormComponent extends BaseFormComponent<
  GetItemCategoryQueryResult,
  CreateItemCategoryCommand,
  UpdateItemCategoryCommand
> {
  protected override service = inject(ItemCategoryService);
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
        type: FieldType.Select,
        fieldName: 'itemTypeId',
        label: 'itemType',
        endpoint: 'item-types',
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
