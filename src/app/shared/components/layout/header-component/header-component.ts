import { Component, EventEmitter, Output, Input, inject, signal, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.scss'],
  imports: [FormsModule, RouterModule, TranslateModule],
  standalone: true,
})
export class HeaderComponent {
  public authService = inject(AuthService);
  isUserMenuOpen = signal(false);
  @Input() currentLang!: string;
  @Output() langToggle = new EventEmitter<'en' | 'ar'>();
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<string>();

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.isUserMenuOpen.update((v) => !v);
  }

  @HostListener('document:click')
  closeMenu() {
    this.isUserMenuOpen.set(false);
  }
  
  onToggleSidebar() {
    this.sidebarToggle.emit();
  }

  onToggleLanguage() {
    const newLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.langToggle.emit(newLang);
  }

  onThemeSelect(theme: string) {
    this.themeToggle.emit(theme);
  }
  onLogout() {
    this.authService.logout();
  }
}
