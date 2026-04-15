import { Component, inject, effect, signal } from "@angular/core";
import { BaseFormComponent } from "src/app/shared/components/base-components/base-form-component/base-form-component";
import { BASE_FORM_RESOURCES } from "src/app/shared/components/base-components/base-list.imports";
import { DynamicInputConfig, FieldType } from "src/app/shared/models/dynamic-input-config";
import { ValidationHelper } from "src/app/shared/utils/validation-helper";
import { GetItemBrandQueryResult, CreateItemBrandCommand, UpdateItemBrandCommand } from "../../models/item-brand.contracts";
import { ItemBrandService } from "../../services/item-brand.service";


@Component({
  selector: 'app-item-brand-form-component',
  templateUrl: './item-brand-form-component.html',
  styleUrl: './item-brand-form-component.scss',
  imports: [BASE_FORM_RESOURCES],
  standalone: true,
})
export class ItemBrandFormComponent extends BaseFormComponent<
  GetItemBrandQueryResult,
  CreateItemBrandCommand,
  UpdateItemBrandCommand
> {
  protected override service = inject(ItemBrandService);
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
    ];
  }

  override handleSave(formValue: any) {
    const payload = {
      ...formValue,
    };
    super.handleSave(payload);
  }
}
