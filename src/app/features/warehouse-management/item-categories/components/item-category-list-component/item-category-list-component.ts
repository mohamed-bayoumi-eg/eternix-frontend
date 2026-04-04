import { Component, inject } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { TableColumn } from 'src/app/shared/models/base-requests';
import {
  GetItemCategoryListQueryResult,
  GetItemCategoryListQuery,
} from '../../models/item-category.contracts';
import { ItemCategoryService } from '../../services/item-category.service';
import { FieldType } from 'src/app/shared/models/dynamic-input-config';

@Component({
  selector: 'app-item-category-list-component',
  imports: [BASE_LIST_RESOURCES],
  templateUrl: './item-category-list-component.html',
  styleUrl: './item-category-list-component.scss',
  standalone: true,
})
export class ItemCategoryListComponent extends BaseListComponent<
  GetItemCategoryListQueryResult,
  GetItemCategoryListQuery
> {
  protected override service = inject(ItemCategoryService);

  get columns(): TableColumn[] {
    return [
      { field: 'code', header: 'code', sortable: true },
      { field: 'arabicName', header: 'arabicName', sortable: true },
      { field: 'englishName', header: 'englishName', sortable: true },
      { field: 'isActive', header: 'isActive', sortable: true, type: FieldType.Enum },
    ];
  }

  filterConfigs = [];
}
