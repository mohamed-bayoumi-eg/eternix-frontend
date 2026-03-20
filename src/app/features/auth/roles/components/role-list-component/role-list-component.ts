import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { DynamicListPageComponent } from 'src/app/shared/components/dynamic-components/dynamic-list-page-component/dynamic-list-page-component';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { GetRoleListQueryResult, GetRolesListQuery } from '../../models/role.contracts';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-role-list-component',
  imports: [CommonModule, TranslateModule, DynamicListPageComponent],
  templateUrl: './role-list-component.html',
  styleUrl: './role-list-component.scss',
  standalone: true,
})
export class RoleListComponent extends BaseListComponent<
  GetRoleListQueryResult,
  GetRolesListQuery
> {
  protected override service = inject(RoleService);

  columns: TableColumn[] = [
    { field: 'code', header: 'code', sortable: true },
    { field: 'arabicName', header: 'arabicName', sortable: true },
    { field: 'englishName', header: 'englishName', sortable: true },
    { field: 'description', header: 'description', sortable: true },
  ];

  filterConfigs = [];
}
