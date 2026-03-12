import { Routes } from '@angular/router';
import { TenantListComponent } from './features/tenants/components/tenant-list-component/tenant-list-component';

export const routes: Routes = [
  { path: 'tenants', component: TenantListComponent },
  { path: 'users', component: TenantListComponent },
  { path: '', redirectTo: 'tenants', pathMatch: 'full' },
];
