interface ScreenMenuDto {
  key: string;
  route: string;
  arabicName: string;
  englishName: string;
  actions: string[];
}

interface ModuleMenuDto {
  key: string;
  arabicName: string;
  englishName: string;
  route: string;
  screens: ScreenMenuDto[];
}

interface BreadcrumbLabel {
  ar: string;
  en: string;
}
