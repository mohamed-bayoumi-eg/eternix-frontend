import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.scss'],
  imports: [FormsModule, RouterModule, TranslateModule],
  standalone: true,
})
export class HeaderComponent {
  @Input() currentLang!: string;
  @Output() langToggle = new EventEmitter<'en' | 'ar'>();
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<string>();

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
}
