import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-module-list-component',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './module-list-component.html',
  styleUrl: './module-list-component.scss',
})
export class ModuleListComponent {
  private authService = inject(AuthService);
  private translate = inject(TranslateService);
  modules = computed(() => this.authService.userModules());

  getName(item: any): string {
    return this.translate.getCurrentLang() === 'ar' ? item.arabicName : item.englishName;
  }
}