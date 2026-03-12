import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('./i18n/') || req.url.includes('assets/i18n/')) {
    return next(req);
  }

  const toastr = inject(ToastrService);
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

  const authReq = req.clone({
    setHeaders: {
      'Accept-Language': lang,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return next(authReq).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const body = event.body as any;
          const toastOptions = {
            positionClass: toastPosition,
            enableHtml: true,
          };

          if (body && body.isSuccess !== undefined) {
            if (body.isSuccess && req.method !== 'GET') {
              toastr.success(body.message || 'Success', '', toastOptions);
            } else if (body.isSuccess === false) {
              if (body.errors && body.errors.length > 0) {
                let errorHtml = `<ul style="margin: 0; padding-${isRtl ? 'right' : 'left'}: 15px; list-style-type: disc;">`;
                body.errors.forEach((err: any) => {
                  errorHtml += `<li>${err.message || 'Error'}</li>`;
                });
                errorHtml += `</ul>`;

                toastr.error(errorHtml, '', toastOptions);
              } else {
                toastr.error(body.message || 'Error', '', toastOptions);
              }
            }
          }
        }
      },
      error: (err) => {
        if (!req.url.includes('.json')) {
          const toastOptions = { positionClass: toastPosition, enableHtml: true };

          const errorBody = err.error;

          if (errorBody && errorBody.errors && errorBody.errors.length > 0) {
            let errorHtml = `<ul style="margin: 0; padding-${isRtl ? 'right' : 'left'}: 15px; list-style-type: disc;">`;
            errorBody.errors.forEach((e: any) => {
              errorHtml += `<li>${e.message || 'Error'}</li>`;
            });
            errorHtml += `</ul>`;
            toastr.error(errorHtml, '', toastOptions);
          } else {
            toastr.error(errorBody?.message || 'Server Error', '', toastOptions);
          }
        }
      },
    }),
  );
};
