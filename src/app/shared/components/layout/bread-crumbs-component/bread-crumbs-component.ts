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

    // نفصل الـ URL ونتجاهل 'home' وأي GUIDs (للـ edit) والكلمات الفارغة
    const segments = url.split('/').filter((s) => s && s !== 'home' && !s.match(/^[0-9a-fA-F-]+$/));

    let currentUrl = '/home';
    const modules: ModuleMenuDto[] = this.authService.userModules();

    for (const segment of segments) {
      currentUrl += `/${segment}`;
      const segmentLower = segment.toLowerCase();

      // دالة مساعدة لتنظيف الـ route من الـ slash (مثلاً "/users" تصبح "users")
      const cleanRoute = (r: string) => r.replace(/^\//, '').toLowerCase();

      // 1. البحث في الموديولات (عن طريق الـ key أو الـ route)
      const foundModule = modules.find(
        (m) =>
          m.key.toLowerCase() === segmentLower || (m.route && cleanRoute(m.route) === segmentLower),
      );

      // 2. البحث في الشاشات
      let foundScreen: ScreenMenuDto | undefined = undefined;
      if (!foundModule) {
        for (const m of modules) {
          foundScreen = m.screens?.find(
            (scr: ScreenMenuDto) =>
              cleanRoute(scr.route) === segmentLower || scr.key.toLowerCase() === segmentLower,
          );
          if (foundScreen) break;
        }
      }

      // 3. التعامل مع الكلمات الثابتة (Add / Edit)
      const staticLabels: Record<string, BreadcrumbLabel> = {
        add: { ar: 'إضافة', en: 'Add' },
        edit: { ar: 'تعديل', en: 'Edit' },
      };

      const item = foundModule || foundScreen;
      const staticLabel = staticLabels[segmentLower];

      breadcrumbs.push({
        label: item ? { ar: item.arabicName, en: item.englishName } : staticLabel || segment, // إذا لم يجد موديول أو شاشة، يستخدم الترجمة الثابتة أو الكلمة كما هي
        url: currentUrl,
      });
    }
    return breadcrumbs;
  }
  getDisplayName(label: BreadcrumbLabel | string): string {
    if (typeof label === 'string') return label;
    return this.translate.currentLang === 'ar' ? label.ar : label.en;
  }
}
