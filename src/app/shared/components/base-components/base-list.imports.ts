import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicListPageComponent } from '../dynamic-components/dynamic-list-page-component/dynamic-list-page-component';
import { DynamicFormPageComponent } from '../dynamic-components/dynamic-form-page-component/dynamic-form-page-component';

export { DynamicListPageComponent, DynamicFormPageComponent };

export const BASE_LIST_RESOURCES = [
  CommonModule,
  TranslateModule,
  DynamicListPageComponent,
] as const;

export const BASE_FORM_RESOURCES = [
  CommonModule,
  TranslateModule,
  DynamicFormPageComponent,
] as const;
