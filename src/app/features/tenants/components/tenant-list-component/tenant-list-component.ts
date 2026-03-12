import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GetTenantListQueryResult,
  GetTenantsComboQuery,
  GetTenantsListQuery,
} from '../../models/tenant.contracts';
import { TenantService } from '../../services/tenant.service';
import { TranslateModule } from '@ngx-translate/core';
import { BaseListComponent } from '../../../../shared/components/base-components/base-list-component/base-list-component';
import { TableColumn } from '../../../../shared/models/base-requests';
import { DynamicListPageComponent } from '../../../../shared/components/dynamic-components/dynamic-list-page-component/dynamic-list-page-component';
import { DynamicInputConfig, InputType } from '../../../../shared/models/dynamic-input-config';
import { IsActive } from '../../../../shared/enums/common.enums';

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

  columns: TableColumn[] = [
    { field: 'code', header: 'code', sortable: true },
    { field: 'englishName', header: 'englishName', sortable: true },
    { field: 'arabicName', header: 'arabicName', sortable: true },
    { field: 'isActive', header: 'isActive', sortable: true },
  ];
  filterConfigs: DynamicInputConfig<GetTenantsComboQuery>[] = [
    {
      type: InputType.Enum,
      label: 'isActive',
      fieldName: 'isActive',
      enumData: IsActive,
    },
  ];

  onFilterChanged(event: any) {
    this.updateFilter({ [event.field]: event.value });
  }

  addTenant() {
    console.log('Open Dialog for Add');
  }
  editTenant(item: any) {
    console.log('Open Dialog for Edit', item);
  }

  deleteTenant(id: string) {
    this.onDeleteBase(id);
  }
  onPageSizeUpdate(newSize: number): void {
    this.query.update((q) => ({
      ...q,
      pageSize: newSize,
      pageNumber: 1,
    }));
    this.loadData();
  }
}
