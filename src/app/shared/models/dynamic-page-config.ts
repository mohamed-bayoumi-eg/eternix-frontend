export interface DynamicListPageConfig {
  title?: string;
  showSearch?: boolean;
  showAddBtn?: boolean;
  showEditBtn?: boolean;
  showDeleteBtn?: boolean;
  showCustomActions?: boolean;
  customActions?: CustomAction[];
}
export interface DynamicFormPageConfig {
  title?: string;
  showSaveBtn?: boolean;
  showSaveAndNewBtn?: boolean;
  showDeleteBtn?: boolean;
  showCopyBtn?: boolean;
  showCustomActions?: boolean;
  customActions?: CustomAction[];
}

export interface CustomAction {
  icon: string;
  color: string;
  tooltip: string;
  action: (item: any) => void;
}
