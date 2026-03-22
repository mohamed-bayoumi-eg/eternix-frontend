import { Component, inject } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { TableColumn } from 'src/app/shared/models/base-requests';
import {
  GetDepartmentListQueryResult,
  GetDepartmentListQuery,
} from '../../models/department.contracts';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-list-component',
  imports: [BASE_LIST_RESOURCES],
  templateUrl: './department-list-component.html',
  styleUrl: './department-list-component.scss',
  standalone: true,
})
export class DepartmentListComponent extends BaseListComponent<
  GetDepartmentListQueryResult,
  GetDepartmentListQuery
> {
  protected override service = inject(DepartmentService);

  get columns(): TableColumn[] {
    const currentLang = this.translate.getCurrentLang();

    const departmentManager = currentLang === 'ar' ? 'managerArabicName' : 'managerEnglishName';
    const parentDepartment =
      currentLang === 'ar' ? 'parentDepartmentArabicName' : 'parentDepartmentEnglishName';

    return [
      { field: 'code', header: 'code', sortable: true },
      { field: 'arabicName', header: 'arabicName', sortable: true },
      { field: 'englishName', header: 'englishName', sortable: true },
      { field: departmentManager, header: 'departmentManager' },
      { field: parentDepartment, header: 'parentDepartment' },
      { field: 'isActive', header: 'isActive', sortable: true },
    ];
  }

  filterConfigs = [];
}
