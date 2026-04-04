import { Component, effect, inject, signal } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form-component/base-form-component';
import { BASE_FORM_RESOURCES } from 'src/app/shared/components/base-components/base-list.imports';
import { IsActive } from 'src/app/shared/enums/common.enums';
import { DynamicInputConfig, FieldType } from 'src/app/shared/models/dynamic-input-config';
import { ValidationHelper } from 'src/app/shared/utils/validation-helper';
import {
  GetJobTitleQueryResult,
  CreateJobTitleCommand,
  UpdateJobTitleCommand,
} from '../../models/job-title.contracts';
import { JobTitleService } from '../../services/job-title.service';

@Component({
  selector: 'app-job-title-form-component',
  imports: [BASE_FORM_RESOURCES],
  templateUrl: './job-title-form-component.html',
  styleUrl: './job-title-form-component.scss',
  standalone: true,
})
export class JobTitleFormComponent extends BaseFormComponent<
  GetJobTitleQueryResult,
  CreateJobTitleCommand,
  UpdateJobTitleCommand
> {
  protected override service = inject(JobTitleService);
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
        type: FieldType.Text,
        fieldName: 'description',
        label: 'description',
      },
      {
        type: FieldType.Enum,
        fieldName: 'isActive',
        label: 'isActive',
        enum: IsActive,
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
