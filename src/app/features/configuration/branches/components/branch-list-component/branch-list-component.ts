import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { DynamicInputConfig, FieldType } from 'src/app/shared/models/dynamic-input-config';
import {
  GetBranchListQueryResult,
  GetBranchListQuery,
} from '../../models/branch.contracts';
import { BranchService } from '../../services/branch.service';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';

@Component({
  selector: 'app-branch-list-component',
  imports: [BASE_LIST_RESOURCES],
  templateUrl: './branch-list-component.html',
  styleUrl: './branch-list-component.scss',
  standalone: true,
})
export class BranchListComponent extends BaseListComponent<
  GetBranchListQueryResult,
  GetBranchListQuery
> {
  protected override service = inject(BranchService);

  get columns(): TableColumn[] {
    const currentLang = this.translate.getCurrentLang();
    const branchManager = currentLang === 'ar' ? 'managerArabicName' : 'managerEnglishName';
    const area = currentLang === 'ar' ? 'areaArabicName' : 'areaEnglishName';
    const city = currentLang === 'ar' ? 'cityArabicName' : 'cityEnglishName';
    const country = currentLang === 'ar' ? 'countryArabicName' : 'countryEnglishName';

    return [
      { field: 'code', header: 'code', sortable: true },
      { field: 'arabicName', header: 'arabicName', sortable: true },
      { field: 'englishName', header: 'englishName', sortable: true },
      { field: 'isActive', header: 'isActive', sortable: true, type: FieldType.Enum },
      { field: branchManager, header: 'branchManager' },
      { field: 'address', header: 'address', sortable: true },
      { field: area, header: 'area' },
      { field: city, header: 'city' },
    ];
  }
  filterConfigs: DynamicInputConfig[] = [];
}
