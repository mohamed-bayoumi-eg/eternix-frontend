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
  enum?: any;
  showUndefined?: boolean;
  options?: any[];
  validations?: ValidationConfig[];
  span?: number;
  showErrorMessage?: boolean;
}
