import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { UserType } from 'src/app/features/auth/users/enums/user.enums';
import { ApiService } from './api.service';
import { PermissionType } from 'src/app/features/auth/roles/enums/role.enums';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);

  token = signal<string | null>(localStorage.getItem('token'));
  isSuperAdmin = signal<boolean>(localStorage.getItem('isSuperAdmin') === 'true');
  userType = signal<string>(localStorage.getItem('userType') || UserType.User);
  userModules = signal<any[]>(JSON.parse(localStorage.getItem('modules') || '[]'));
  userName = signal<string | null>(localStorage.getItem('userName'));

  login(command: any) {
    return this.api.post<any, any>('admin/auth/login', command).pipe(
      tap((res: any) => {
        if (res.isSuccess) {
          const data = res.data;

          localStorage.setItem('token', data.token);
          localStorage.setItem('isSuperAdmin', String(data.isSuperAdmin));
          localStorage.setItem('userType', data.userType);
          localStorage.setItem('modules', JSON.stringify(data.modules));
          localStorage.setItem('userName', data.userName);

          this.token.set(data.token);
          this.isSuperAdmin.set(data.isSuperAdmin);
          this.userType.set(data.userType);
          this.userModules.set(data.modules);
          this.userName.set(data.userName);
        }
      }),
    );
  }

  hasPermission(screenKey: string, action: string): boolean {
    if (this.isSuperAdmin() || this.userType() === 'Admin' || this.userType() === 'TenantAdmin') {
      return true;
    }

    const screen = this.userModules()
      .flatMap((m) => m.screens)
      .find((s: any) => s.key.toLowerCase() === screenKey.toLowerCase());
    if (!screen) return false;

    return screen.actions.some(
      (a: string) => a.toLowerCase() === PermissionType.FullControl.toLowerCase() || a.toLowerCase() === action.toLowerCase(),
    );
  }

  logout() {
    localStorage.clear();
    this.userType.set(UserType.User);
    this.token.set(null);
    this.isSuperAdmin.set(false);
    this.userModules.set([]);
    this.router.navigate(['/login']);
  }
}
