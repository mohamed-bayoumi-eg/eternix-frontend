import { Component, effect, inject, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { DynamicInputConfig, FieldType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetAreaQueryResult,
  CreateAreaCommand,
  UpdateAreaCommand,
} from '../../models/area.contracts';
import { AreaService } from '../../services/area.service';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';

@Component({
  selector: 'app-area-form-component',
  imports: [BASE_FORM_RESOURCES],
  templateUrl: './area-form-component.html',
  styleUrl: './area-form-component.scss',
  standalone: true,
})
export class AreaFormComponent extends BaseFormComponent<
  GetAreaQueryResult,
  CreateAreaCommand,
  UpdateAreaCommand
> {
  protected override service = inject(AreaService);
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
        fieldName: 'cityId',
        label: 'city',
        endpoint: 'cities',
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
