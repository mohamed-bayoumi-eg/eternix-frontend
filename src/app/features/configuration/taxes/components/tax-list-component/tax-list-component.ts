import { Component, inject } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { GetTaxListQueryResult, GetTaxListQuery } from '../../models/tax.contracts';
import { TaxService } from '../../services/tax.service';

@Component({
  selector: 'app-tax-list-component',
  imports: [BASE_LIST_RESOURCES],
  templateUrl: './tax-list-component.html',
  styleUrl: './tax-list-component.scss',
  standalone: true,
})
export class TaxListComponent extends BaseListComponent<GetTaxListQueryResult, GetTaxListQuery> {
  protected override service = inject(TaxService);

  columns: TableColumn[] = [
    { field: 'code', header: 'code', sortable: true },
    { field: 'arabicName', header: 'arabicName', sortable: true },
    { field: 'englishName', header: 'englishName', sortable: true },
    { field: 'percentage', header: 'percentage', sortable: true },
    { field: 'taxAuthorityCode', header: 'taxAuthorityCode', sortable: true },
    { field: 'taxType', header: 'taxType', sortable: true },
    { field: 'isActive', header: 'isActive', sortable: true },
  ];

  filterConfigs = [];
}
