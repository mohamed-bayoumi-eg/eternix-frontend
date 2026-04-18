import { FormGroup } from '@angular/forms';

export enum FieldType {
  Text = 'text',
  Number = 'number',
  TextArea = 'textarea',
  Select = 'select',
  MultiSelect = 'multiSelect',
  Enum = 'enum',
  Checkbox = 'checkbox',
  Date = 'date',
  DateTime = 'dateTime',
}

export interface ValidationConfig {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  pattern?: string;
}

export interface DynamicInputConfig<TQuery = any> {
  type: FieldType;
  fieldName: string;
  label?: string;
  endpoint?: string;
  queryModel?: new () => TQuery;
  options?: any[];
  enum?: any;
  showUndefined?: boolean;
  span?: number;
  showErrorMessage?: boolean;
  validations?: ValidationConfig[];
  dynamicValidations?: (form: FormGroup) => ValidationConfig[];
  validationWhen?: (form: FormGroup) => boolean;
  visibleWhen?: (form: FormGroup) => boolean;
  dependsOn?: string[];
}
