import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);

  token = signal<string | null>(localStorage.getItem('token'));
  userName = signal<string | null>(localStorage.getItem('userName'));
  userModules = signal<any[]>(JSON.parse(localStorage.getItem('modules') || '[]'));
  permissions = signal<string[]>(JSON.parse(localStorage.getItem('permissions') || '[]'));

  login(command: any) {
    return this.api.post<any, any>('admin/auth/login', command).pipe(
      tap((res: any) => {
        if (res.isSuccess) {
          const data = res.data;

          localStorage.setItem('token', data.token);
          localStorage.setItem('userName', data.userName);
          localStorage.setItem('modules', JSON.stringify(data.modules));
          localStorage.setItem('permissions', JSON.stringify(data.permissions));

          this.token.set(data.token);
          this.userName.set(data.userName);
          this.userModules.set(data.modules);
          this.permissions.set(data.permissions);
        }
      }),
    );
  }
  logout() {
    localStorage.clear();
    this.token.set(null);
    this.userName.set(null);
    this.userModules.set([]);
    this.permissions.set([]);
    this.router.navigate(['/login']);
  }

  hasPermission(screenKey: string, action: string): boolean {
    const screen = this.userModules()
      .flatMap((m) => m.screens)
      .find((s: any) => s.key === screenKey);

    if (!screen) return false;

    return screen.actions.includes('FullControl') || screen.actions.includes(action);
  }
}
