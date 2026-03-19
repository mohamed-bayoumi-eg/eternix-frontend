import { Component, computed, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';

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
  screens: ScreenMenuDto[];
}

@Component({
  selector: 'app-sidebar-component',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './sidebar-component.html',
  styleUrls: ['./sidebar-component.scss'],
})
export class SidebarComponent {
  @Input() collapsed = false;
  private authService = inject(AuthService);
  private translate = inject(TranslateService);

  menus = computed<ModuleMenuDto[]>(() => this.authService.userModules());

  activeMenu: string | null = null;
  getName(item: any): string {
    const lang = this.translate.getCurrentLang();
    return lang === 'ar' ? item.arabicName : item.englishName;
  }
  toggleMenu(key: string) {
    this.activeMenu = this.activeMenu === key ? null : key;
  }

  isOpen = (key: string) => this.activeMenu === key;
}
