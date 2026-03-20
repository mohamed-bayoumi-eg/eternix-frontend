import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(private translate: TranslateService) {
    const lang = localStorage.getItem('lang') || 'en';
    this.translate.setFallbackLang(lang);
    this.translate.use(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const theme = localStorage.getItem('theme') || 'first-theme';
    document.body.className = theme;
  }

  ngOnInit() {}
}