import { Component, inject } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { GetCurrencyListQueryResult, GetCurrencyListQuery } from '../../models/currency.contracts';
import { CurrencyService } from '../../services/currency.service';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';

@Component({
  selector: 'app-currency-list-component',
  imports: [BASE_LIST_RESOURCES],
  templateUrl: './currency-list-component.html',
  styleUrl: './currency-list-component.scss',
  standalone: true,
})
export class CurrencyListComponent extends BaseListComponent<
  GetCurrencyListQueryResult,
  GetCurrencyListQuery
> {
  protected override service = inject(CurrencyService);

  columns: TableColumn[] = [
    { field: 'code', header: 'code', sortable: true },
    { field: 'arabicName', header: 'arabicName', sortable: true },
    { field: 'englishName', header: 'englishName', sortable: true },
    { field: 'isoCode', header: 'isoCode', sortable: true },
    { field: 'symbol', header: 'symbol' },
    { field: 'arabicSubUnitName', header: 'arabicSubUnitName', sortable: true },
    { field: 'englishSubUnitName', header: 'englishSubUnitName', sortable: true },
  ];

  filterConfigs = [];
}
