import { Component, inject } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { GetJobTitleListQueryResult, GetJobTitleListQuery } from '../../models/job-title.contracts';
import { JobTitleService } from '../../services/job-title.service';

@Component({
  selector: 'app-job-title-list-component',
  imports: [BASE_LIST_RESOURCES],
  templateUrl: './job-title-list-component.html',
  styleUrl: './job-title-list-component.scss',
  standalone: true,
})
export class JobTitleListComponent extends BaseListComponent<
  GetJobTitleListQueryResult,
  GetJobTitleListQuery
> {
  protected override service = inject(JobTitleService);

  get columns(): TableColumn[] {
    const currentLang = this.translate.getCurrentLang();

    return [
      { field: 'code', header: 'code', sortable: true },
      { field: 'arabicName', header: 'arabicName', sortable: true },
      { field: 'englishName', header: 'englishName', sortable: true },
      { field: 'description', header: 'description', sortable: true },
      { field: 'isActive', header: 'isActive', sortable: true },
    ];
  }

  filterConfigs = [];
}
