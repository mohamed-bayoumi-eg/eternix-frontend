import { Component, inject } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { GetCityListQueryResult, GetCityListQuery } from '../../models/city.contracts';
import { CityService } from '../../services/city.service';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';

@Component({
  selector: 'app-city-list-component',
  imports: [BASE_LIST_RESOURCES],
  templateUrl: './city-list-component.html',
  styleUrl: './city-list-component.scss',
  standalone: true,
})
export class CityListComponent extends BaseListComponent<GetCityListQueryResult, GetCityListQuery> {
  protected override service = inject(CityService);

  get columns(): TableColumn[] {
    const currentLang = this.translate.getCurrentLang();

    const country = currentLang === 'ar' ? 'countryArabicName' : 'countryEnglishName';

    return [
      { field: 'code', header: 'code', sortable: true },
      { field: 'arabicName', header: 'arabicName', sortable: true },
      { field: 'englishName', header: 'englishName', sortable: true },
      { field: country, header: 'country' },
    ];
  }

  filterConfigs: DynamicInputConfig[] = [
    {
      type: InputType.Select,
      fieldName: 'countryId',
      label: 'country',
      endpoint: 'countries',
    },
  ];
}
