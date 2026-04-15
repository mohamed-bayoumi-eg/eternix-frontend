import { Component, inject, effect, signal } from '@angular/core';
import { GetAreaComboQuery } from 'src/app/features/configuration/areas/models/area.contracts';
import { GetCityComboQuery } from 'src/app/features/configuration/cities/models/city.contracts';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { YesNo } from 'src/app/shared/enums/common.enums';
import { DynamicInputConfig, FieldType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetWarehouseQueryResult,
  CreateWarehouseCommand,
  UpdateWarehouseCommand,
} from '../../models/warehouse.contracts';
import { WarehouseService } from '../../services/warehouse.service';

@Component({
  selector: 'app-warehouse-form-component',
  templateUrl: './warehouse-form-component.html',
  styleUrl: './warehouse-form-component.scss',
  imports: [BASE_FORM_RESOURCES],
  standalone: true,
})
export class WarehouseFormComponent extends BaseFormComponent<
  GetWarehouseQueryResult,
  CreateWarehouseCommand,
  UpdateWarehouseCommand
> {
  protected override service = inject(WarehouseService);
  constructor() {
    super();
    effect(() => {
      const data = this.editData();
    });
  }
  isTableValid = signal(false);

  get formConfig(): DynamicInputConfig[] {
    return [
      {
        type: FieldType.Text,
        fieldName: 'arabicName',
        label: 'arabicName',
        validations: [ValidationHelper.ArabicName],
      },
      {
        type: FieldType.Text,
        fieldName: 'englishName',
        label: 'englishName',
        validations: [ValidationHelper.EnglishName],
      },
      {
        type: FieldType.Select,
        fieldName: 'countryId',
        label: 'country',
        endpoint: 'countries',
        validations: [ValidationHelper.Required],
      },
      {
        type: FieldType.Select,
        fieldName: 'cityId',
        label: 'city',
        endpoint: 'cities',
        queryModel: GetCityComboQuery,
        validations: [ValidationHelper.Required],
      },
      {
        type: FieldType.Select,
        fieldName: 'areaId',
        label: 'area',
        endpoint: 'areas',
        queryModel: GetAreaComboQuery,
        validations: [ValidationHelper.Required],
      },
      {
        type: FieldType.Text,
        fieldName: 'address',
        label: 'address',
        validations: [ValidationHelper.Address],
      },
      {
        type: FieldType.Select,
        fieldName: 'branchId',
        label: 'branch',
        endpoint: 'branches',
        validations: [ValidationHelper.Required],
      },
      {
        type: FieldType.Enum,
        fieldName: 'isActive',
        label: 'isActive',
        enum: YesNo,
        validations: [ValidationHelper.Required],
      },
      {
        type: FieldType.Enum,
        fieldName: 'isMain',
        label: 'isMain',
        enum: YesNo,
        validations: [ValidationHelper.Required],
      },
    ];
  }

  override handleSave(formValue: any) {
    const payload = {
      ...formValue,
    };
    super.handleSave(payload);
  }
}
