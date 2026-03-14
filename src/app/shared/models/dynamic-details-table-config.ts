import { WritableSignal } from "@angular/core";
import { DynamicInputConfig } from "./dynamic-input-config";

export interface DynamicDetailsTableConfig {
  title: string;
  columns: DynamicInputConfig[];
  data: WritableSignal<any[]>; 
  showAddBtn?: boolean;
  showDeleteBtn?: boolean;
  required?: boolean;
}