import { Routes } from '@angular/router';
import { TenantListComponent } from './features/tenants/components/tenant-list-component/tenant-list-component';
import { TenantFormComponent } from './features/tenants/components/tenant-form-component/tenant-form-component';

export const routes: Routes = [
  {
    path: 'tenants',
    children: [
      { path: '', component: TenantListComponent },
      { path: 'add', component: TenantFormComponent },
      { path: 'edit/:id', component: TenantFormComponent },
    ],
  },
  { path: '', redirectTo: 'tenants', pathMatch: 'full' },
];
