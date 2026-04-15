import { Component, inject, effect, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { DynamicDetailsTableComponent } from 'src/app/shared/components/dynamic-components/dynamic-details-table-component/dynamic-details-table-component';
import { DynamicDetailsTableConfig } from 'src/app/shared/models/dynamic-details-table-config';
import { DynamicInputConfig, FieldType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetItemQueryResult,
  CreateItemCommand,
  UpdateItemCommand,
  ItemUnitDto,
} from '../../models/item.contracts';
import { ItemService } from '../../services/Item.service';
import { GetItemCategoryComboQuery } from '../../../item-categories/models/item-category.contracts';
import { MarginType, PricingMethod } from '../../enums/item.enums';
import { YesNo } from 'src/app/shared/enums/common.enums';

@Component({
  selector: 'app-item-form-component',
  templateUrl: './item-form-component.html',
  styleUrl: './item-form-component.scss',
  imports: [BASE_FORM_RESOURCES, DynamicDetailsTableComponent],
  standalone: true,
})
export class ItemFormComponent extends BaseFormComponent<
  GetItemQueryResult,
  CreateItemCommand,
  UpdateItemCommand
> {
  protected override service = inject(ItemService);
  constructor() {
    super();
    effect(() => {
      const data = this.editData();
      if (data && data.itemUnits) {
        this.selectedItemUnits.set([...data.itemUnits]);
      } else {
        this.selectedItemUnits.set([]);
      }
    });
  }
  isTableValid = signal(false);

  selectedItemUnits = signal<ItemUnitDto[]>([]);
  readonly formConfig: DynamicInputConfig[] = [
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
    {
      type: FieldType.Select,
      fieldName: 'itemCategoryId',
      label: 'itemCategory',
      endpoint: 'item-categories',
      queryModel: GetItemCategoryComboQuery,
      validations: [ValidationHelper.Required],
      dependsOn: ['itemTypeId'],
    },
    {
      type: FieldType.Select,
      fieldName: 'itemBrandId',
      label: 'itemBrand',
      endpoint: 'item-brands',
    },
    {
      type: FieldType.Select,
      fieldName: 'unitId',
      label: 'unit',
      endpoint: 'units',
      validations: [ValidationHelper.Required],
    },
    {
      type: FieldType.Text,
      fieldName: 'barcode',
      label: 'barcode',
      validations: [ValidationHelper.EnglishName],
    },
    {
      type: FieldType.Enum,
      fieldName: 'pricingMethod',
      label: 'pricingMethod',
      enum: PricingMethod,
      span: 4,
      validations: [ValidationHelper.Required],
    },
    {
      type: FieldType.Enum,
      fieldName: 'marginType',
      label: 'marginType',
      enum: MarginType,
      visibleWhen: (form) => form.get('pricingMethod')?.value === PricingMethod.CostPlusMargin,
    },
    {
      type: FieldType.Number,
      fieldName: 'sellingPrice',
      label: 'sellingPrice',
      validations: [ValidationHelper.PositiveNumber],
      visibleWhen: (form) => form.get('pricingMethod')?.value !== PricingMethod.CostPlusMargin,
    },
    {
      type: FieldType.Number,
      fieldName: 'margin',
      label: 'margin',
      validations: [ValidationHelper.PositiveNumber, ValidationHelper.Percentage],
      visibleWhen: (form) => form.get('pricingMethod')?.value === PricingMethod.CostPlusMargin,
    },
    {
      type: FieldType.Enum,
      fieldName: 'hasExpiry',
      label: 'hasExpiry',
      enum: YesNo,
    },
    {
      type: FieldType.Enum,
      fieldName: 'hasBatch',
      label: 'hasBatch',
      enum: YesNo,
    },
    {
      type: FieldType.Enum,
      fieldName: 'hasSerial',
      label: 'hasSerial',
      enum: YesNo,
    },
    {
      type: FieldType.Enum,
      fieldName: 'isActive',
      label: 'isActive',
      enum: YesNo,
      validations: [ValidationHelper.Required],
    },
  ];
  readonly itemUnitFormConfig: DynamicInputConfig[] = [
    {
      type: FieldType.Select,
      fieldName: 'unitId',
      label: 'unit',
      endpoint: 'units',
      validations: [ValidationHelper.Required],
      span: 6,
    },
    {
      type: FieldType.Number,
      fieldName: 'conversionFactor',
      label: 'conversionFactor',
      validations: [ValidationHelper.Required, ValidationHelper.PositiveNumber],
    },
  ];

  tabsConfig: DynamicDetailsTableConfig[] = [
    {
      title: 'itemUnits',
      columns: this.itemUnitFormConfig,
      data: this.selectedItemUnits,
      required: true,
      showAddBtn: true,
      showDeleteBtn: true,
    },
  ];

  get tabLabels() {
    return this.tabsConfig.map((t) => t.title);
  }

  addItemUnit() {
    const newItemUnit: ItemUnitDto = {
      unitId: '0',
      conversionFactor: 0,
    };
    this.selectedItemUnits.update((prev) => [...prev, newItemUnit]);
  }

  removeItemUnit(index: number) {
    this.selectedItemUnits.update((prev) => prev.filter((_, i) => i !== index));
  }

  updateItemUnit(index: number, field: string, event: any) {
    const val = event.target.value;
    const current = [...this.selectedItemUnits()];
    (current[index] as any)[field] = val;
    this.selectedItemUnits.set(current);
  }
  override handleSave(formValue: any) {
    const payload = {
      ...formValue,
      permissions: this.selectedItemUnits(),
    };
    super.handleSave(payload);
  }
  override handleSaveAndNew(formValue: any) {
    const payload = {
      ...formValue,
      permissions: this.selectedItemUnits(),
    };
    super.handleSaveAndNew(payload);
  }
  protected override afterDataLoaded(data: GetItemQueryResult): void {
    if (data && data.itemUnits) {
      this.selectedItemUnits.set([...data.itemUnits]);
    } else {
      this.selectedItemUnits.set([]);
    }
  }
  protected override onClearForm(): void {
    this.selectedItemUnits.set([]);
    this.isTableValid.set(false);
  }
}
