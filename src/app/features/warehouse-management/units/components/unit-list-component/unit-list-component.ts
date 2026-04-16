import { Component, inject } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { GetUnitListQueryResult, GetUnitListQuery } from '../../models/unit.contracts';
import { UnitService } from '../../services/unit.service';
import { FieldType } from 'src/app/shared/models/dynamic-input-config';

@Component({
  selector: 'app-unit-list-component',
  imports: [BASE_LIST_RESOURCES],
  templateUrl: './unit-list-component.html',
  styleUrl: './unit-list-component.scss',
  standalone: true,
})
export class UnitListComponent extends BaseListComponent<GetUnitListQueryResult, GetUnitListQuery> {
  protected override service = inject(UnitService);

  columns: TableColumn[] = [
    { field: 'code', header: 'code', sortable: true },
    { field: 'arabicName', header: 'arabicName', sortable: true },
    { field: 'englishName', header: 'englishName', sortable: true },
    { field: 'symbol', header: 'symbol', sortable: true },
    { field: 'globalUnitCode', header: 'globalUnitCode', sortable: true },
    { field: 'isActive', header: 'isActive', sortable: true, type: FieldType.Enum },
  ];
  filterConfigs = [];
}
