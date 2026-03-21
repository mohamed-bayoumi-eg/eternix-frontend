import { Component, inject } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { GetUserListQueryResult, GetUsersListQuery } from '../../models/user.contracts';
import { UserService } from '../../services/user.service';
import { IsActive } from 'src/app/shared/enums/common.enums';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { UserType } from '../../enums/user.enums';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';

@Component({
  selector: 'app-user-list-component',
  imports: [BASE_LIST_RESOURCES],
  templateUrl: './user-list-component.html',
  styleUrl: './user-list-component.scss',
  standalone: true,
})
export class UserListComponent extends BaseListComponent<
  GetUserListQueryResult,
  GetUsersListQuery
> {
  protected override service = inject(UserService);

  columns: TableColumn[] = [
    { field: 'code', header: 'code', sortable: true },
    { field: 'userName', header: 'userName', sortable: true },
    { field: 'arabicName', header: 'arabicName', sortable: true },
    { field: 'englishName', header: 'englishName', sortable: true },
    { field: 'phoneNumber', header: 'phoneNumber', sortable: true },
    { field: 'isActive', header: 'isActive', sortable: true },
    { field: 'userType', header: 'userType', sortable: true },
  ];

  filterConfigs: DynamicInputConfig[] = [
    {
      type: InputType.Enum,
      label: 'isActive',
      fieldName: 'isActive',
      enum: IsActive,
      showErrorMessage: false,
    },
    {
      type: InputType.Enum,
      label: 'userType',
      fieldName: 'userType',
      enum: UserType,
      showErrorMessage: false,
    },
  ];
}
