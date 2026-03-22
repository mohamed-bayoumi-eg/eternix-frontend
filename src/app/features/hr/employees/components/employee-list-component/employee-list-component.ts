import { Component, inject } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { GetEmployeeListQueryResult, GetEmployeeListQuery } from '../../models/employee.contracts';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list-component',
  imports: [BASE_LIST_RESOURCES],
  templateUrl: './employee-list-component.html',
  styleUrl: './employee-list-component.scss',
  standalone: true,
})
export class EmployeeListComponent extends BaseListComponent<
  GetEmployeeListQueryResult,
  GetEmployeeListQuery
> {
  protected override service = inject(EmployeeService);

  get columns(): TableColumn[] {
    const currentLang = this.translate.getCurrentLang();

    const department = currentLang === 'ar' ? 'departmentArabicName' : 'departmentEnglishName';
    const jobTitle = currentLang === 'ar' ? 'jobTitleArabicName' : 'jobTitleEnglishName';
    const branch = currentLang === 'ar' ? 'branchArabicName' : 'branchEnglishName';
    const user = currentLang === 'ar' ? 'userArabicName' : 'userEnglishName';

    return [
      { field: 'employeeCode', header: 'employeeCode', sortable: true },
      { field: 'arabicName', header: 'arabicName', sortable: true },
      { field: 'englishName', header: 'englishName', sortable: true },
      { field: department, header: 'department' },
      { field: jobTitle, header: 'jobTitle' },
      { field: branch, header: 'branch' },
      { field: user, header: 'user' },
      { field: 'hireDate', header: 'hireDate', sortable: true },
      { field: 'isActive', header: 'isActive', sortable: true },
    ];
  }

  filterConfigs = [];
}
