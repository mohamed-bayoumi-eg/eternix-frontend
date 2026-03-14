import { Routes } from '@angular/router';
import { RoleFormComponent } from './features/auth/roles/components/role-form-component/role-form-component';
import { RoleListComponent } from './features/auth/roles/components/role-list-component/role-list-component';
import { TenantFormComponent } from './features/auth/tenants/components/tenant-form-component/tenant-form-component';
import { TenantListComponent } from './features/auth/tenants/components/tenant-list-component/tenant-list-component';

export const routes: Routes = [
  {
    path: 'tenants',
    children: [
      { path: '', component: TenantListComponent },
      { path: 'add', component: TenantFormComponent },
      { path: 'edit/:id', component: TenantFormComponent },
    ],
  },
  {
    path: 'roles',
    children: [
      { path: '', component: RoleListComponent },
      { path: 'add', component: RoleFormComponent },
      { path: 'edit/:id', component: RoleFormComponent },
    ],
  },
  { path: '', redirectTo: 'tenants', pathMatch: 'full' },
];
