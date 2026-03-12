import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr'; 
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { apiInterceptor } from './shared/interceptors/api-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    provideHttpClient(
      withInterceptors([apiInterceptor])
    ),

    provideAnimations(), 

    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
    }),

    importProvidersFrom(
      TranslateModule.forRoot({
        fallbackLang: 'en',
      }),
    ),

    provideTranslateHttpLoader({
      prefix: './i18n/',
      suffix: '.json',
    }),
  ],
};

