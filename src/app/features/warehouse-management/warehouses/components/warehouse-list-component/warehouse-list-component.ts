import { Component, inject } from "@angular/core";
import { BaseListComponent } from "src/app/shared/components/base-components/base-list-component/base-list-component";
import { BASE_LIST_RESOURCES } from "src/app/shared/components/base-components/base-list.imports";
import { TableColumn } from "src/app/shared/models/base-requests";
import { FieldType, DynamicInputConfig } from "src/app/shared/models/dynamic-input-config";
import { GetWarehouseListQueryResult, GetWarehouseListQuery } from "../../models/warehouse.contracts";
import { WarehouseService } from "../../services/warehouse.service";

@Component({
  selector: 'app-warehouse-list-component',
  templateUrl: './warehouse-list-component.html',
  styleUrl: './warehouse-list-component.scss',
  imports: [BASE_LIST_RESOURCES],
  standalone: true,
})
export class WarehouseListComponent extends BaseListComponent<
  GetWarehouseListQueryResult,
  GetWarehouseListQuery
> {
  protected override service = inject(WarehouseService);

  get columns(): TableColumn[] {
    const currentLang = this.translate.getCurrentLang();
    const area = currentLang === 'ar' ? 'areaArabicName' : 'areaEnglishName';
    const city = currentLang === 'ar' ? 'cityArabicName' : 'cityEnglishName';

    return [
      { field: 'code', header: 'code', sortable: true },
      { field: 'arabicName', header: 'arabicName', sortable: true },
      { field: 'englishName', header: 'englishName', sortable: true },
      { field: 'isActive', header: 'isActive', sortable: true, type: FieldType.Enum },
      { field: 'isMain', header: 'isMain', sortable: true, type: FieldType.Enum },
      { field: 'address', header: 'address', sortable: true },
      { field: area, header: 'area' },
      { field: city, header: 'city' },
    ];
  }
  filterConfigs: DynamicInputConfig[] = [];
}
