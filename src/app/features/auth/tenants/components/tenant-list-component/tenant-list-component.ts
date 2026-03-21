import { Component, OnInit, signal, inject } from '@angular/core';
import {
  GetTenantListQuery,
  GetTenantListQueryResult,
} from '../../models/tenant.contracts';
import { TenantService } from '../../services/tenant.service';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { IsActive } from 'src/app/shared/enums/common.enums';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';

@Component({
  selector: 'app-tenant-list-component',
  standalone: true,
  imports: [BASE_LIST_RESOURCES],
  templateUrl: './tenant-list-component.html',
  styleUrl: './tenant-list-component.scss',
})
export class TenantListComponent extends BaseListComponent<
  GetTenantListQueryResult,
  GetTenantListQuery
> {
  protected override service = inject(TenantService);

  columns: TableColumn[] = [
    { field: 'code', header: 'code', sortable: true },
    { field: 'arabicName', header: 'arabicName', sortable: true },
    { field: 'englishName', header: 'englishName', sortable: true },
    { field: 'isActive', header: 'isActive', sortable: true },
    { field: 'email', header: 'email', sortable: true },
    { field: 'phoneNumber', header: 'phoneNumber', sortable: true },
  ];

  filterConfigs: DynamicInputConfig[] = [
    {
      type: InputType.Enum,
      label: 'isActive',
      fieldName: 'isActive',
      enum: IsActive,
      showErrorMessage: false,
    },
  ];
}
