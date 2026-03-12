import { FormGroup } from '@angular/forms';

export enum InputType {
  Text = 'text',
  Number = 'number',
  TextArea = 'textarea',
  Select = 'select',
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
  email?: boolean;
  pattern?: string;
}

export interface DynamicInputConfig<TQuery = any> {
  type: InputType;
  fieldName: string;
  label: string;
  endpoint?: string;
  queryModel?: new () => TQuery;
  mapFromForm?: (keyof TQuery)[];
  enumData?: any;
  options?: any[];
  validations?: ValidationConfig;
}
