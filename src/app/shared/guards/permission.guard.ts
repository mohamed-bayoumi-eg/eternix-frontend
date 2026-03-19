import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const permissionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const screenKey = route.data['screenKey'];

  const userScreen = authService
    .userModules()
    .flatMap((m) => m.screens)
    .find((s: any) => s.key === screenKey);

  const hasAccess =
    userScreen &&
    (userScreen.actions.includes('Read') || userScreen.actions.includes('FullControl'));

  if (hasAccess) {
    return true;
  }

  authService.logout();
  return false;
};
