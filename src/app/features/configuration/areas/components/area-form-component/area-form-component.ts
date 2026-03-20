import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { DynamicFormPageComponent } from 'src/app/shared/components/dynamic-components/dynamic-form-page-component/dynamic-form-page-component';
import { DynamicInputConfig, InputType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetAreaQueryResult,
  CreateAreaCommand,
  UpdateAreaCommand,
} from '../../models/area.contracts';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-area-form-component',
  imports: [CommonModule, DynamicFormPageComponent, TranslateModule],
  templateUrl: './area-form-component.html',
  styleUrl: './area-form-component.scss',
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
        type: InputType.Text,
        fieldName: 'arabicName',
        label: 'arabicName',
        validations: [ValidationHelper.ArabicName],
      },
      {
        type: InputType.Text,
        fieldName: 'englishName',
        label: 'englishName',
        validations: [ValidationHelper.EnglishName],
      },
      {
        type: InputType.Select,
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
