import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/layout/footer-component/footer-component';
import { HeaderComponent } from './shared/components/layout/header-component/header-component';
import { SidebarComponent } from './shared/components/layout/sidebar-component/sidebar-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  currentTheme = signal<string>(localStorage.getItem('theme') || 'first-theme');

  isSidebarCollapsed = false;
  currentLang = signal<'en' | 'ar'>((localStorage.getItem('lang') as 'en' | 'ar') || 'en');

  constructor(private translate: TranslateService) {
    this.translate.use(this.currentLang());
    this.setDirection(this.currentLang());

    document.body.className = this.currentTheme();
  }
  ngOnInit() {
    const savedState = localStorage.getItem('sidebarState');
    this.isSidebarCollapsed = savedState === 'collapsed';
  }
  handleThemeChange(theme: string) {
    this.currentTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }

  handleLangToggle(lang: 'en' | 'ar') {
    this.currentLang.set(lang);
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    this.setDirection(lang);
  }

  private setDirection(lang: 'en' | 'ar') {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  handleSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    localStorage.setItem('sidebarState', this.isSidebarCollapsed ? 'collapsed' : 'expanded');
  }
}
