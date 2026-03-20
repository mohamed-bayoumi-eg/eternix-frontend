import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { DynamicListPageComponent } from 'src/app/shared/components/dynamic-components/dynamic-list-page-component/dynamic-list-page-component';
import { TableColumn } from 'src/app/shared/models/base-requests';
import {
  GetCityComboQuery,
  GetCityListQueryResult,
  GetCityListQuery,
} from '../../models/city.contracts';
import { CityService } from '../../services/city.service';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-city-list-component',
  imports: [CommonModule, TranslateModule, DynamicListPageComponent],
  templateUrl: './city-list-component.html',
  styleUrl: './city-list-component.scss',
  standalone: true,
})
export class CityListComponent extends BaseListComponent<
  GetCityListQueryResult,
  GetCityListQuery
> {
  protected override service = inject(CityService);
  private translate = inject(TranslateService);

  get columns(): TableColumn[] {
    const currentLang = this.translate.getCurrentLang();

    const countryField = currentLang === 'ar' ? 'countryArabicName' : 'countryEnglishName';

    return [
      { field: 'code', header: 'code', sortable: true },
      { field: 'arabicName', header: 'arabicName', sortable: true },
      { field: 'englishName', header: 'englishName', sortable: true },
      { field: countryField, header: 'country' },
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
