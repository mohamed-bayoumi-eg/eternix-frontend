export interface DynamicPageConfig {
  title: string;
  showSearch?: boolean;
  showAddBtn?: boolean;
  showEditBtn?: boolean;
  showDeleteBtn?: boolean;
  showCustomActions?: boolean;
  customActions?: CustomAction[];
}

export interface CustomAction {
  icon: string;
  color: string;
  tooltip: string;
  action: (item: any) => void;
}
