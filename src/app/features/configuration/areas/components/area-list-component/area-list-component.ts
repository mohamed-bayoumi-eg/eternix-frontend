import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list-component/base-list-component';
import { DynamicListPageComponent } from 'src/app/shared/components/dynamic-components/dynamic-list-page-component/dynamic-list-page-component';
import { TableColumn } from 'src/app/shared/models/base-requests';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import {
  GetAreaListQueryResult,
  GetAreasListQuery,
  GetCitesComboQuery,
} from '../../models/area.contracts';
import { AreaService } from '../../services/area.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-area-list-component',
  imports: [CommonModule, TranslateModule, DynamicListPageComponent],
  templateUrl: './area-list-component.html',
  styleUrl: './area-list-component.scss',
  standalone: true,
})
export class AreaListComponent extends BaseListComponent<
  GetAreaListQueryResult,
  GetAreasListQuery
> {
  protected override service = inject(AreaService);
  protected override baseRoute = '/areas';
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
  filterConfigs: DynamicInputConfig<GetCitesComboQuery>[] = [
    {
      type: InputType.Select,
      fieldName: 'cityId',
      label: 'city',
      endpoint: 'cities',
    },
  ];
}
