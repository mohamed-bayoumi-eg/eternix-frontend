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
import { BranchListComponent } from './features/configuration/branches/components/branch-list-component/branch-list-component';
import { BranchFormComponent } from './features/configuration/branches/components/branch-form-component/branch-form-component';
import { CurrencyListComponent } from './features/configuration/currencies/components/currency-list-component/currency-list-component';
import { CurrencyFormComponent } from './features/configuration/currencies/components/currency-form-component/currency-form-component';
import { TaxListComponent } from './features/warehouse-management/taxes/components/tax-list-component/tax-list-component';
import { TaxFormComponent } from './features/warehouse-management/taxes/components/tax-form-component/tax-form-component';
import { UnitListComponent } from './features/warehouse-management/units/components/unit-list-component/unit-list-component';
import { UnitFormComponent } from './features/warehouse-management/units/components/unit-form-component/unit-form-component';
import { DepartmentListComponent } from './features/hr/departments/components/department-list-component/department-list-component';
import { DepartmentFormComponent } from './features/hr/departments/components/department-form-component/department-form-component';
import { JobTitleListComponent } from './features/hr/job-titles/components/job-title-list-component/job-title-list-component';
import { JobTitleFormComponent } from './features/hr/job-titles/components/job-title-form-component/job-title-form-component';
import { EmployeeListComponent } from './features/hr/employees/components/employee-list-component/employee-list-component';
import { EmployeeFormComponent } from './features/hr/employees/components/employee-form-component/employee-form-component';
import { ItemCategoryListComponent } from './features/warehouse-management/item-categories/components/item-category-list-component/item-category-list-component';
import { ItemCategoryFormComponent } from './features/warehouse-management/item-categories/components/item-category-form-component/item-category-form-component';
import { ItemTypeListComponent } from './features/warehouse-management/item-types/components/item-type-list-component/item-type-list-component';
import { ItemTypeFormComponent } from './features/warehouse-management/item-types/components/item-type-form-component/item-type-form-component';
import { WarehouseListComponent } from './features/warehouse-management/warehouses/components/warehouse-list-component/warehouse-list-component';
import { WarehouseFormComponent } from './features/warehouse-management/warehouses/components/warehouse-form-component/warehouse-form-component';
import { ItemBrandListComponent } from './features/warehouse-management/item-brands/components/item-brand-list-component/item-brand-list-component';
import { ItemBrandFormComponent } from './features/warehouse-management/item-brands/components/item-brand-form-component/item-brand-form-component';
import { ItemListComponent } from './features/warehouse-management/items/components/item-list-component/item-list-component';
import { ItemFormComponent } from './features/warehouse-management/items/components/item-form-component/item-form-component';

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
              {
                path: 'branches',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'Branches' },
                children: [
                  { path: '', component: BranchListComponent },
                  { path: 'add', component: BranchFormComponent },
                  { path: 'edit/:id', component: BranchFormComponent },
                ],
              },
              {
                path: 'currencies',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'Currencies' },
                children: [
                  { path: '', component: CurrencyListComponent },
                  { path: 'add', component: CurrencyFormComponent },
                  { path: 'edit/:id', component: CurrencyFormComponent },
                ],
              },
              {
                path: 'taxes',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'Taxes' },
                children: [
                  { path: '', component: TaxListComponent },
                  { path: 'add', component: TaxFormComponent },
                  { path: 'edit/:id', component: TaxFormComponent },
                ],
              },
              {
                path: 'units',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'Units' },
                children: [
                  { path: '', component: UnitListComponent },
                  { path: 'add', component: UnitFormComponent },
                  { path: 'edit/:id', component: UnitFormComponent },
                ],
              },
              {
                path: 'departments',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'Departments' },
                children: [
                  { path: '', component: DepartmentListComponent },
                  { path: 'add', component: DepartmentFormComponent },
                  { path: 'edit/:id', component: DepartmentFormComponent },
                ],
              },
              {
                path: 'job-titles',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'JobTitles' },
                children: [
                  { path: '', component: JobTitleListComponent },
                  { path: 'add', component: JobTitleFormComponent },
                  { path: 'edit/:id', component: JobTitleFormComponent },
                ],
              },
              {
                path: 'employees',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'Employees' },
                children: [
                  { path: '', component: EmployeeListComponent },
                  { path: 'add', component: EmployeeFormComponent },
                  { path: 'edit/:id', component: EmployeeFormComponent },
                ],
              },
              {
                path: 'item-categories',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'ItemCategories' },
                children: [
                  { path: '', component: ItemCategoryListComponent },
                  { path: 'add', component: ItemCategoryFormComponent },
                  { path: 'edit/:id', component: ItemCategoryFormComponent },
                ],
              },
              {
                path: 'item-types',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'ItemTypes' },
                children: [
                  { path: '', component: ItemTypeListComponent },
                  { path: 'add', component: ItemTypeFormComponent },
                  { path: 'edit/:id', component: ItemTypeFormComponent },
                ],
              },
              {
                path: 'warehouses',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'Warehouses' },
                children: [
                  { path: '', component: WarehouseListComponent },
                  { path: 'add', component: WarehouseFormComponent },
                  { path: 'edit/:id', component: WarehouseFormComponent },
                ],
              },
              {
                path: 'item-brands',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'ItemBrands' },
                children: [
                  { path: '', component: ItemBrandListComponent },
                  { path: 'add', component: ItemBrandFormComponent },
                  { path: 'edit/:id', component: ItemBrandFormComponent },
                ],
              },
               {
                path: 'items',
                canActivateChild: [permissionGuard],
                data: { screenKey: 'Items' },
                children: [
                  { path: '', component: ItemListComponent },
                  { path: 'add', component: ItemFormComponent },
                  { path: 'edit/:id', component: ItemFormComponent },
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
