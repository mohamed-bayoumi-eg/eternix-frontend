import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserType } from 'src/app/features/auth/users/enums/user.enums';

export const permissionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const screenKey = route.data['screenKey'];

  if (
    authService.isSuperAdmin() ||
    authService.userType() === UserType.Admin ||
    authService.userType() === UserType.TenantAdmin
  ) {
    return true;
  }

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
