import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'appTranslate',
  standalone: true,
  pure: false,
})
export class AppTranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: any): any {
    if (!value) return '';
    return this.translate.instant(value.toString());
  }
}
