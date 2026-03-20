import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-bread-crumbs-component',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './bread-crumbs-component.html',
  styleUrl: './bread-crumbs-component.scss',
})
export class BreadCrumbsComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private translate = inject(TranslateService);

  breadcrumbs: Array<{ label: BreadcrumbLabel | string; url: string }> = [];

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.router.url);
    });
  }

private createBreadcrumbs(url: string): Array<{ label: BreadcrumbLabel | string; url: string }> {
  const breadcrumbs: Array<{ label: BreadcrumbLabel | string; url: string }> = [];
  
  const segments = url.split('/').filter((s) => s && s !== 'home');

  let currentUrl = '/home';
  const modules: ModuleMenuDto[] = this.authService.userModules();

  for (const segment of segments) {
    const isId = /^[0-9]+$/.test(segment) || /^[0-9a-fA-F-]{24,}$/.test(segment) || segment.match(/^[0-9a-fA-F-]{8}-[0-9a-fA-F-]{4}/);
    
    if (isId) continue; 

    currentUrl += `/${segment}`;
    const segmentLower = segment.toLowerCase();
    const cleanRoute = (r: string) => r.replace(/^\//, '').toLowerCase();

    const foundModule = modules.find(m => 
      m.key.toLowerCase() === segmentLower || (m.route && cleanRoute(m.route) === segmentLower)
    );
    
    let foundScreen: ScreenMenuDto | undefined = undefined;
    if (!foundModule) {
      for (const m of modules) {
        foundScreen = m.screens?.find(scr => 
          cleanRoute(scr.route) === segmentLower || scr.key.toLowerCase() === segmentLower
        );
        if (foundScreen) break;
      }
    }

    const staticLabels: Record<string, BreadcrumbLabel> = {
      'add': { ar: 'إضافة', en: 'Add' },
      'edit': { ar: 'تعديل', en: 'Edit' }
    };

    const item = foundModule || foundScreen;
    const staticLabel = staticLabels[segmentLower];

    if (item || staticLabel) {
      breadcrumbs.push({
        label: item ? { ar: item.arabicName, en: item.englishName } : staticLabel!,
        url: currentUrl
      });
    }
  }
  return breadcrumbs;
}
  getDisplayName(label: BreadcrumbLabel | string): string {
    if (typeof label === 'string') return label;
    return this.translate.currentLang === 'ar' ? label.ar : label.en;
  }
}
