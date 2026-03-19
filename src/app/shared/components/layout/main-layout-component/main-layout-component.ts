import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header-component/header-component';
import { SidebarComponent } from '../sidebar-component/sidebar-component';
import { FooterComponent } from '../footer-component/footer-component';
import { ScrollButtonsDirective } from 'src/app/shared/directives/scroll-buttons-directive';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ScrollButtonsDirective,
  ],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.scss',
})
export class MainLayoutComponent implements OnInit {
  currentTheme = signal<string>(localStorage.getItem('theme') || 'first-theme');
  isSidebarCollapsed = false;
  currentLang = signal<'en' | 'ar'>((localStorage.getItem('lang') as 'en' | 'ar') || 'en');

  constructor(private translate: TranslateService) {
    this.translate.use(this.currentLang());
    this.setDirection(this.currentLang());
    document.body.className = this.currentTheme();
  }

  ngOnInit() {
    this.isSidebarCollapsed = localStorage.getItem('sidebarState') === 'collapsed';
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
