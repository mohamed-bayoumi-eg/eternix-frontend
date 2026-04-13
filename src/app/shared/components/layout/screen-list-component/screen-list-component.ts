import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
@Component({
  selector: 'app-screen-list-component',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './screen-list-component.html',
  styleUrl: './screen-list-component.scss',
})
export class ScreenListComponent {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private translate = inject(TranslateService);

  moduleKey = toSignal(this.route.params.pipe(map((p) => p['moduleRoute'])));
  currentModule = computed<ModuleMenuDto | undefined>(() => {
    const module = this.authService.userModules().find((m) => m.route === this.moduleKey());

    if (!module) return undefined;

    return {
      ...module,
      screens: (module.screens ?? [])
        .slice()
        .sort((a: ScreenMenuDto, b: ScreenMenuDto) => a.order - b.order),
    };
  });
  getName(item: any): string {
    return this.translate.currentLang === 'ar' ? item.arabicName : item.englishName;
  }
}
