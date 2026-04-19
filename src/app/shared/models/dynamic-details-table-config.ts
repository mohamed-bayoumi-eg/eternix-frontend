import { WritableSignal } from '@angular/core';
import { DynamicInputConfig } from './dynamic-input-config';
import { FormGroup } from '@angular/forms';

export interface DynamicDetailsTableConfig {
  title: string;
  columns: DynamicInputConfig[];
  data: WritableSignal<any[]>;
  parentForm?: FormGroup;
  showAddBtn?: boolean;
  showDeleteBtn?: boolean;
  required?: boolean;
}
