import { Routes } from '@angular/router';
import { RoleFormComponent } from './features/auth/roles/components/role-form-component/role-form-component';
import { RoleListComponent } from './features/auth/roles/components/role-list-component/role-list-component';
import { TenantFormComponent } from './features/auth/tenants/components/tenant-form-component/tenant-form-component';
import { TenantListComponent } from './features/auth/tenants/components/tenant-list-component/tenant-list-component';
import { UserFormComponent } from './features/auth/users/components/user-form-component/user-form-component';
import { UserListComponent } from './features/auth/users/components/user-list-component/user-list-component';
import { CountryListComponent } from './features/configuration/countries/components/country-list-component/country-list-component';
import { CountryFormComponent } from './features/configuration/countries/components/country-form-component/country-form-component';
import { CityListComponent } from './features/configuration/cities/components/city-list-component/city-list-component';
import { CityFormComponent } from './features/configuration/cities/components/city-form-component/city-form-component';
import { AreaListComponent } from './features/configuration/areas/components/area-list-component/area-list-component';
import { AreaFormComponent } from './features/configuration/areas/components/area-form-component/area-form-component';

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
  {
    path: 'users',
    children: [
      { path: '', component: UserListComponent },
      { path: 'add', component: UserFormComponent },
      { path: 'edit/:id', component: UserFormComponent },
    ],
  },
  {
    path: 'countries',
    children: [
      { path: '', component: CountryListComponent },
      { path: 'add', component: CountryFormComponent },
      { path: 'edit/:id', component: CountryFormComponent },
    ],
  },
  {
    path: 'cities',
    children: [
      { path: '', component: CityListComponent },
      { path: 'add', component: CityFormComponent },
      { path: 'edit/:id', component: CityFormComponent },
    ],
  },
  {
    path: 'areas',
    children: [
      { path: '', component: AreaListComponent },
      { path: 'add', component: AreaFormComponent },
      { path: 'edit/:id', component: AreaFormComponent },
    ],
  },
  { path: '', redirectTo: 'tenants', pathMatch: 'full' },
];
