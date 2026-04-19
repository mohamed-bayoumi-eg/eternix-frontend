import { Component, inject, effect, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { DynamicDetailsTableComponent } from 'src/app/shared/components/dynamic-components/dynamic-details-table-component/dynamic-details-table-component';
import { DynamicDetailsTableConfig } from 'src/app/shared/models/dynamic-details-table-config';
import { DynamicInputConfig, FieldType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetInventoryTransactionQueryResult,
  CreateInventoryTransactionCommand,
  UpdateInventoryTransactionCommand,
  InventoryTransactionLineDto,
} from '../../models/inventory-transaction.contracts';
import { InventoryTransactionService } from '../../services/inventory-transaction.service';
import { InventoryTransactionType } from '../../enums/inventory-transaction.enums';

@Component({
  selector: 'app-inventory-transaction-form-component',
  templateUrl: './inventory-transaction-form-component.html',
  styleUrl: './inventory-transaction-form-component.scss',
  imports: [BASE_FORM_RESOURCES, DynamicDetailsTableComponent],
  standalone: true,
})
export class InventoryTransactionFormComponent extends BaseFormComponent<
  GetInventoryTransactionQueryResult,
  CreateInventoryTransactionCommand,
  UpdateInventoryTransactionCommand
> {
  protected override service = inject(InventoryTransactionService);
  constructor() {
    super();
    effect(() => {
      const data = this.editData();
      if (data && data.inventoryTransactionLines) {
        this.selectedInventoryTransactionLines.set([...data.inventoryTransactionLines]);
      } else {
        this.selectedInventoryTransactionLines.set([]);
      }
    });
  }
  isTableValid = signal(false);

  selectedInventoryTransactionLines = signal<InventoryTransactionLineDto[]>([]);
  readonly formConfig: DynamicInputConfig[] = [
    {
      type: FieldType.Enum,
      enum: InventoryTransactionType,
      fieldName: 'inventoryTransactionType',
      label: 'inventoryTransactionType',
      span: 4,
      validations: [ValidationHelper.Required],
    },
    {
      type: FieldType.Select,
      fieldName: 'fromWarehouseId',
      label: 'fromWarehouse',
      endpoint: 'warehouses',
      validations: [ValidationHelper.Required],
      validationWhen: (form) => {
        const type = form.get('inventoryTransactionType')?.value;
        return [
          InventoryTransactionType.Sales,
          InventoryTransactionType.PurchaseReturn,
          InventoryTransactionType.Transfer,
          InventoryTransactionType.AdjustmentDecrease,
          InventoryTransactionType.Damage,
        ].includes(type);
      },
      visibleWhen: (form) => {
        const type = form.get('inventoryTransactionType')?.value;
        return [
          InventoryTransactionType.Sales,
          InventoryTransactionType.PurchaseReturn,
          InventoryTransactionType.Transfer,
          InventoryTransactionType.AdjustmentDecrease,
          InventoryTransactionType.Damage,
        ].includes(type);
      },
      dependsOn: ['inventoryTransactionType'],
    },
    {
      type: FieldType.Select,
      fieldName: 'toWarehouseId',
      label: 'toWarehouse',
      endpoint: 'warehouses',
      validations: [ValidationHelper.Required],
      validationWhen: (form) => {
        const type = form.get('inventoryTransactionType')?.value;
        return [
          InventoryTransactionType.OpeningBalance,
          InventoryTransactionType.SalesReturn,
          InventoryTransactionType.Purchase,
          InventoryTransactionType.Transfer,
          InventoryTransactionType.AdjustmentIncrease,
        ].includes(type);
      },
      visibleWhen: (form) => {
        const type = form.get('inventoryTransactionType')?.value;
        return [
          InventoryTransactionType.OpeningBalance,
          InventoryTransactionType.SalesReturn,
          InventoryTransactionType.Purchase,
          InventoryTransactionType.Transfer,
          InventoryTransactionType.AdjustmentIncrease,
        ].includes(type);
      },
      dependsOn: ['inventoryTransactionType'],
    },
    {
      type: FieldType.Text,
      fieldName: 'reason',
      label: 'reason',
      validations: [ValidationHelper.Required],
    },
  ];
  readonly inventoryTransactionLineFormConfig: DynamicInputConfig[] = [
    {
      type: FieldType.Select,
      fieldName: 'itemId',
      label: 'item',
      endpoint: 'items',
      validations: [ValidationHelper.Required],
    },
    {
      type: FieldType.Select,
      fieldName: 'unitId',
      label: 'unit',
      endpoint: 'units',
      validations: [ValidationHelper.Required],
    },
    {
      type: FieldType.Number,
      fieldName: 'quantity',
      label: 'quantity',
      validations: [ValidationHelper.Required, ValidationHelper.PositiveNumber],
    },
    {
      type: FieldType.Number,
      fieldName: 'unitPrice',
      label: 'unitPrice',
      validations: [ValidationHelper.Required, ValidationHelper.PositiveNumber],
      validationWhen: (form) => {
        const type = form.get('inventoryTransactionType')?.value;
        return [
          InventoryTransactionType.OpeningBalance,
          InventoryTransactionType.Purchase,
          InventoryTransactionType.Sales,
        ].includes(type);
      },
      visibleWhen: (form) => {
        const type = form.get('inventoryTransactionType')?.value;
        return [
          InventoryTransactionType.OpeningBalance,
          InventoryTransactionType.Purchase,
          InventoryTransactionType.Sales,
        ].includes(type);
      },
      dependsOn: ['inventoryTransactionType'],
    },
  ];

  tabsConfig: DynamicDetailsTableConfig[] = [
    {
      title: 'inventoryTransactionLines',
      columns: this.inventoryTransactionLineFormConfig,
      data: this.selectedInventoryTransactionLines,
      showAddBtn: true,
      showDeleteBtn: true,
      required : true,
    },
  ];

  get tabLabels() {
    return this.tabsConfig.map((t) => t.title);
  }

  addInventoryTransactionUnit() {
    const newInventoryTransactionUnit: InventoryTransactionLineDto = {
      itemId: '0',
      unitId: '0',
      quantity: 0,
      unitPrice: 0,
    };
    this.selectedInventoryTransactionLines.update((prev) => [...prev, newInventoryTransactionUnit]);
  }

  removeInventoryTransactionUnit(index: number) {
    this.selectedInventoryTransactionLines.update((prev) => prev.filter((_, i) => i !== index));
  }

  updateInventoryTransactionUnit(index: number, field: string, event: any) {
    const val = event.target.value;
    const current = [...this.selectedInventoryTransactionLines()];
    (current[index] as any)[field] = val;
    this.selectedInventoryTransactionLines.set(current);
  }
  override handleSave(formValue: any) {
    const payload = {
      ...formValue,
      inventoryTransactionLines: this.selectedInventoryTransactionLines(),
    };
    super.handleSave(payload);
  }
  override handleSaveAndNew(formValue: any) {
    const payload = {
      ...formValue,
      inventoryTransactionLines: this.selectedInventoryTransactionLines(),
    };
    super.handleSaveAndNew(payload);
  }
  protected override afterDataLoaded(data: GetInventoryTransactionQueryResult): void {
    if (data && data.inventoryTransactionLines) {
      this.selectedInventoryTransactionLines.set([...data.inventoryTransactionLines]);
    } else {
      this.selectedInventoryTransactionLines.set([]);
    }
  }
  protected override onClearForm(): void {
    this.selectedInventoryTransactionLines.set([]);
    this.isTableValid.set(false);
  }
}
