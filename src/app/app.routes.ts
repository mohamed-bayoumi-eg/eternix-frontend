import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { permissionGuard } from './shared/guards/permission.guard';
import { MainLayoutComponent } from './shared/components/layout/main-layout-component/main-layout-component';
import { ModuleListComponent } from './shared/components/layout/module-list-component/module-list-component';
import { ScreenListComponent } from './shared/components/layout/screen-list-component/screen-list-component';
import { LoginComponent } from './shared/components/auth/login-component/login-component';
import { RoleFormComponent } from './features/auth/roles/components/role-form-component/role-form-component';
import { RoleListComponent } from './features/auth/roles/components/role-list-component/role-list-component';
import { TenantFormComponent } from './features/auth/tenants/components/tenant-form-component/tenant-form-component';
import { TenantListComponent } from './features/auth/tenants/components/tenant-list-component/tenant-list-component';
import { UserFormComponent } from './features/auth/users/components/user-form-component/user-form-component';
import { UserListComponent } from './features/auth/users/components/user-list-component/user-list-component';
import { AreaFormComponent } from './features/configuration/areas/components/area-form-component/area-form-component';
import { AreaListComponent } from './features/configuration/areas/components/area-list-component/area-list-component';
import { CityFormComponent } from './features/configuration/cities/components/city-form-component/city-form-component';
import { CityListComponent } from './features/configuration/cities/components/city-list-component/city-list-component';
import { CountryFormComponent } from './features/configuration/countries/components/country-form-component/country-form-component';
import { CountryListComponent } from './features/configuration/countries/components/country-list-component/country-list-component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        children: [
          { path: '', component: ModuleListComponent },
          {
            path: ':moduleRoute',
            children: [
              { path: '', component: ScreenListComponent },
              {
                path: 'tenants',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'Tenants' },
                children: [
                  { path: '', component: TenantListComponent },
                  { path: 'add', component: TenantFormComponent },
                  { path: 'edit/:id', component: TenantFormComponent },
                ],
              },
              {
                path: 'roles',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'Roles' },
                children: [
                  { path: '', component: RoleListComponent },
                  { path: 'add', component: RoleFormComponent },
                  { path: 'edit/:id', component: RoleFormComponent },
                ],
              },
              {
                path: 'users',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'Users' },
                children: [
                  { path: '', component: UserListComponent },
                  { path: 'add', component: UserFormComponent },
                  { path: 'edit/:id', component: UserFormComponent },
                ],
              },
              {
                path: 'countries',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'Countries' },
                children: [
                  { path: '', component: CountryListComponent },
                  { path: 'add', component: CountryFormComponent },
                  { path: 'edit/:id', component: CountryFormComponent },
                ],
              },
              {
                path: 'cities',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'Cities' },
                children: [
                  { path: '', component: CityListComponent },
                  { path: 'add', component: CityFormComponent },
                  { path: 'edit/:id', component: CityFormComponent },
                ],
              },
              {
                path: 'areas',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'Areas' },
                children: [
                  { path: '', component: AreaListComponent },
                  { path: 'add', component: AreaFormComponent },
                  { path: 'edit/:id', component: AreaFormComponent },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },
];
