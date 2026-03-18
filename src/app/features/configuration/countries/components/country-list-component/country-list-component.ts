import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { DynamicListPageComponent } from 'src/app/shared/components/dynamic-components/dynamic-list-page-component/dynamic-list-page-component';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { GetCountryListQueryResult, GetCountrysListQuery } from '../../models/country.contracts';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-list-component',
  imports: [CommonModule, TranslateModule, DynamicListPageComponent],
  templateUrl: './country-list-component.html',
  styleUrl: './country-list-component.scss',
})
export class CountryListComponent extends BaseListComponent<
  GetCountryListQueryResult,
  GetCountrysListQuery
> {
  protected override service = inject(CountryService);
  protected override baseRoute = '/countries';

  columns: TableColumn[] = [
    { field: 'code', header: 'code', sortable: true },
    { field: 'arabicName', header: 'arabicName', sortable: true },
    { field: 'englishName', header: 'englishName', sortable: true },
  ];

  filterConfigs = [];
}
