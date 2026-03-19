import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GetTenantListQueryResult,
  GetTenantsComboQuery,
  GetTenantsListQuery,
} from '../../models/tenant.contracts';
import { TenantService } from '../../services/tenant.service';
import { TranslateModule } from '@ngx-translate/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { DynamicListPageComponent } from 'src/app/shared/components/dynamic-components/dynamic-list-page-component/dynamic-list-page-component';
import { IsActive } from 'src/app/shared/enums/common.enums';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';

@Component({
  selector: 'app-tenant-list-component',
  standalone: true,
  imports: [CommonModule, TranslateModule, DynamicListPageComponent],
  templateUrl: './tenant-list-component.html',
  styleUrl: './tenant-list-component.scss',
})
export class TenantListComponent extends BaseListComponent<
  GetTenantListQueryResult,
  GetTenantsListQuery
> {
  protected override service = inject(TenantService);
  protected override baseRoute = '/tenants';

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
