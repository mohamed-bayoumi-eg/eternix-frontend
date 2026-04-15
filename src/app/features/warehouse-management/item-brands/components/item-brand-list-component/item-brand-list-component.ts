import { Component, inject } from "@angular/core";
import { BaseListComponent } from "src/app/shared/components/base-components/base-list-component/base-list-component";
import { BASE_LIST_RESOURCES } from "src/app/shared/components/base-components/base-list.imports";
import { TableColumn } from "src/app/shared/models/base-requests";
import { GetItemBrandListQueryResult, GetItemBrandListQuery } from "../../models/item-brand.contracts";
import { ItemBrandService } from "../../services/item-brand.service";

@Component({
  selector: 'app-item-brand-list-component',
  templateUrl: './item-brand-list-component.html',
  styleUrl: './item-brand-list-component.scss',
  imports: [BASE_LIST_RESOURCES],
  standalone: true,
})
export class ItemBrandListComponent extends BaseListComponent<
  GetItemBrandListQueryResult,
  GetItemBrandListQuery
> {
  protected override service = inject(ItemBrandService);

  get columns(): TableColumn[] {
    return [
      { field: 'code', header: 'code', sortable: true },
      { field: 'arabicName', header: 'arabicName', sortable: true },
      { field: 'englishName', header: 'englishName', sortable: true },
    ];
  }

  filterConfigs = [];
}
