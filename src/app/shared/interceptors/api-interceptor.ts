import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('./i18n/') || req.url.includes('assets/i18n/')) {
    return next(req);
  }

  const toastr = inject(ToastrService);
  const authService = inject(AuthService);
  const injector = inject(Injector);

  const token = localStorage.getItem('token');
  let lang = localStorage.getItem('lang') || 'ar';

  try {
    const translate = injector.get(TranslateService);
    if (translate && translate.currentLang) {
      lang = translate.currentLang;
    }
  } catch (e) {}

  const isRtl = lang === 'ar';
  const toastPosition = isRtl ? 'toast-top-left' : 'toast-top-right';
  const toastOptions = { positionClass: toastPosition, enableHtml: true };

  const authReq = req.clone({
    setHeaders: {
      'Accept-Language': lang,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const formatErrors = (errors: any): string => {
    let html = `<ul style="margin: 0; padding-${isRtl ? 'right' : 'left'}: 15px; list-style-type: disc;">`;
    if (Array.isArray(errors)) {
      errors.forEach((err: any) => {
        html += `<li>${err.message || err}</li>`;
      });
    } else if (typeof errors === 'object') {
      Object.keys(errors).forEach((key) => {
        const messages = errors[key];
        if (Array.isArray(messages)) {
          messages.forEach((msg) => {
            html += `<li>${msg}</li>`;
          });
        } else {
          html += `<li>${messages}</li>`;
        }
      });
    }
    html += `</ul>`;
    return html;
  };

  return next(authReq).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const body = event.body as any;
          if (body && body.isSuccess !== undefined) {
            if (body.isSuccess && req.method !== 'GET') {
              setTimeout(() => {
                toastr.success(body.message || 'Success', '', toastOptions);
              });
            } else if (body.isSuccess === false) {
              setTimeout(() => {
                toastr.error(
                  body.errors ? formatErrors(body.errors) : body.message || 'Error',
                  '',
                  toastOptions,
                );
              });
            }
          }
        }
      },
      error: (err) => {
        if (err.status === 401 || err.status === 403) {
          authService.logout();
          toastr.error('Session expired or access denied', '', toastOptions);
        }
        if (!req.url.includes('.json')) {
          const errorBody = err.error;
          toastr.error(
            errorBody?.errors
              ? formatErrors(errorBody.errors)
              : errorBody?.message || 'Server Error',
            '',
            toastOptions,
          );
        }
      },
    }),
  );
};
