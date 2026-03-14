import { Routes } from '@angular/router';
import { TenantListComponent } from './features/tenants/components/tenant-list-component/tenant-list-component';
import { TenantFormComponent } from './features/tenants/components/tenant-form-component/tenant-form-component';
import { RoleFormComponent } from './features/roles/components/role-form-component/role-form-component';
import { RoleListComponent } from './features/roles/components/role-list-component/role-list-component';

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
