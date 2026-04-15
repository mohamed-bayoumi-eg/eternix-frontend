import { Component, inject } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { GetItemListQueryResult, GetItemListQuery } from '../../models/item.contracts';
import { ItemService } from '../../services/Item.service';
import { DynamicInputConfig, FieldType } from 'src/app/shared/models/dynamic-input-config';
import { GetCityComboQuery } from 'src/app/features/configuration/cities/models/city.contracts';
import { GetItemCategoryComboQuery } from '../../../item-categories/models/item-category.contracts';

@Component({
  selector: 'app-item-list-component',
  templateUrl: './item-list-component.html',
  styleUrl: './item-list-component.scss',
  imports: [BASE_LIST_RESOURCES],
  standalone: true,
})
export class ItemListComponent extends BaseListComponent<GetItemListQueryResult, GetItemListQuery> {
  protected override service = inject(ItemService);

  get columns(): TableColumn[] {
    const currentLang = this.translate.getCurrentLang();
    const item = currentLang === 'ar' ? 'arabicName' : 'englishName';
    const itemType = currentLang === 'ar' ? 'itemTypeArabicName' : 'itemTypeEnglishName';
    const itemCategory =
      currentLang === 'ar' ? 'itemCategoryArabicName' : 'itemCategoryEnglishName';
    const itemBrand = currentLang === 'ar' ? 'itemBrandArabicName' : 'itemBrandEnglishName';
    const unit = currentLang === 'ar' ? 'unitArabicName' : 'unitEnglishName';

    return [
      { field: 'code', header: 'code', sortable: true },
      { field: item, header: 'itemName', sortable: true },
      { field: itemType, header: 'itemType' },
      { field: itemCategory, header: 'itemCategory' },
      { field: itemBrand, header: 'itemBrand' },
      { field: unit, header: 'unit' },
      { field: 'isActive', header: 'isActive', sortable: true, type: FieldType.Enum },
    ];
  }

  filterConfigs: DynamicInputConfig[] = [
    {
      type: FieldType.Select,
      fieldName: 'itemTypeId',
      label: 'itemType',
      endpoint: 'item-types',
      showErrorMessage: false,
    },
    {
      type: FieldType.Select,
      fieldName: 'itemCategoryId',
      label: 'itemCategory',
      endpoint: 'item-categories',
      queryModel: GetItemCategoryComboQuery,
      showErrorMessage: false,
    },
    {
      type: FieldType.Select,
      fieldName: 'itemBrandId',
      label: 'itemBrand',
      endpoint: 'item-brands',
      showErrorMessage: false,
    },
  ];
}
