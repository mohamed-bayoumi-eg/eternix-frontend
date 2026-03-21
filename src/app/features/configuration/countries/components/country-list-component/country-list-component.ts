import { Component, inject } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { GetCountryListQueryResult, GetCountryListQuery } from '../../models/country.contracts';
import { CountryService } from '../../services/country.service';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';

@Component({
  selector: 'app-country-list-component',
  imports: [BASE_LIST_RESOURCES],
  templateUrl: './country-list-component.html',
  styleUrl: './country-list-component.scss',
  standalone :true
})
export class CountryListComponent extends BaseListComponent<
  GetCountryListQueryResult,
  GetCountryListQuery
> {
  protected override service = inject(CountryService);

  columns: TableColumn[] = [
    { field: 'code', header: 'code', sortable: true },
    { field: 'arabicName', header: 'arabicName', sortable: true },
    { field: 'englishName', header: 'englishName', sortable: true },
  ];

  filterConfigs = [];
}
