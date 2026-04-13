import { Component, inject } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { GetItemTypeListQueryResult, GetItemTypeListQuery } from '../../models/item-type.contracts';
import { ItemTypeService } from '../../services/item-type.service';

@Component({
  selector: 'app-item-type-list-component',
  templateUrl: './item-type-list-component.html',
  styleUrl: './item-type-list-component.scss',
  imports: [BASE_LIST_RESOURCES],
  standalone: true,
})
export class ItemTypeListComponent extends BaseListComponent<
  GetItemTypeListQueryResult,
  GetItemTypeListQuery
> {
  protected override service = inject(ItemTypeService);

  get columns(): TableColumn[] {
    return [
      { field: 'code', header: 'code', sortable: true },
      { field: 'arabicName', header: 'arabicName', sortable: true },
      { field: 'englishName', header: 'englishName', sortable: true },
    ];
  }

  filterConfigs = [];
}
