import { Component, inject } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { FieldType, DynamicInputConfig } from 'src/app/shared/models/dynamic-input-config';
import {
  GetInventoryTransactionListQueryResult,
  GetInventoryTransactionListQuery,
} from '../../models/inventory-transaction.contracts';
import { InventoryTransactionService } from '../../services/inventory-transaction.service';
import { YesNo } from 'src/app/shared/enums/common.enums';
import { InventoryTransactionType } from '../../enums/inventory-transaction.enums';

@Component({
  selector: 'app-inventory-transaction-list-component',
  templateUrl: './inventory-transaction-list-component.html',
  styleUrl: './inventory-transaction-list-component.scss',
  imports: [BASE_LIST_RESOURCES],
  standalone: true,
})
export class InventoryTransactionListComponent extends BaseListComponent<
  GetInventoryTransactionListQueryResult,
  GetInventoryTransactionListQuery
> {
  protected override service = inject(InventoryTransactionService);

  get columns(): TableColumn[] {
    const currentLang = this.translate.getCurrentLang();
    const fromWarehouse =
      currentLang === 'ar' ? 'fromWarehouseArabicName' : 'fromWarehouseEnglishName';
    const toWarehouse = currentLang === 'ar' ? 'toWarehouseArabicName' : 'toWarehouseEnglishName';

    return [
      { field: 'code', header: 'code', sortable: true },
      { field: 'inventoryTransactionType', header: 'inventoryTransactionType', sortable: true },
      { field: 'postedDateTime', header: 'postedDateTime', sortable: true },
      { field: 'isPosted', header: 'isPosted', sortable: true, type: FieldType.Enum },
      { field: fromWarehouse, header: 'fromWarehouse' },
      { field: toWarehouse, header: 'toWarehouse' },
    ];
  }

  filterConfigs: DynamicInputConfig[] = [
    {
      type: FieldType.DateTime,
      fieldName: 'postedDateTimeFrom',
      label: 'postedDateTimeFrom',
      showErrorMessage: false,
    },
    {
      type: FieldType.DateTime,
      fieldName: 'postedDateTimeTo',
      label: 'postedDateTimeTo',
      showErrorMessage: false,
    },
    {
      type: FieldType.Enum,
      enum: InventoryTransactionType,
      fieldName: 'inventoryTransactionType',
      label: 'inventoryTransactionType',
      showErrorMessage: false,
      span: 4,
    },
    {
      type: FieldType.Enum,
      enum: YesNo,
      fieldName: 'isPosted',
      label: 'isPosted',
      showErrorMessage: false,
    },
  ];
}
