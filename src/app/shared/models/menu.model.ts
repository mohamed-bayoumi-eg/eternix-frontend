interface ScreenMenuDto {
  key: string;
  route: string;
  arabicName: string;
  englishName: string;
  order: number;
  actions: string[];
}

interface ModuleMenuDto {
  key: string;
  arabicName: string;
  englishName: string;
  route: string;
  order: number;
  screens: ScreenMenuDto[];
}

interface BreadcrumbLabel {
  ar: string;
  en: string;
}
