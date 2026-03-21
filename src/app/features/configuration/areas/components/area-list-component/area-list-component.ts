import { Component, inject } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { GetAreaListQueryResult, GetAreaListQuery } from '../../models/area.contracts';
import { AreaService } from '../../services/area.service';
import { TranslateService } from '@ngx-translate/core';
import { BASE_LIST_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';

@Component({
  selector: 'app-area-list-component',
  imports: [BASE_LIST_RESOURCES],
  templateUrl: './area-list-component.html',
  styleUrl: './area-list-component.scss',
  standalone: true,
})
export class AreaListComponent extends BaseListComponent<GetAreaListQueryResult, GetAreaListQuery> {
  protected override service = inject(AreaService);
  private translate = inject(TranslateService);

  get columns(): TableColumn[] {
    const currentLang = this.translate.getCurrentLang();
    const cityField = currentLang === 'ar' ? 'cityArabicName' : 'cityEnglishName';

    return [
      { field: 'code', header: 'code', sortable: true },
      { field: 'arabicName', header: 'arabicName', sortable: true },
      { field: 'englishName', header: 'englishName', sortable: true },
      { field: cityField, header: 'city' },
    ];
  }
  filterConfigs: DynamicInputConfig[] = [
    {
      type: InputType.Select,
      fieldName: 'cityId',
      label: 'city',
      endpoint: 'cities',
    },
  ];
}
