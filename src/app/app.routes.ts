import { Routes } from '@angular/router';
import { PortalComponent } from './components/portal/portal.component';
import { CustomerPortalComponent } from './components/portal/customer-portal/customer-portal.component';
import { VendorPortalComponent } from './components/portal/vendor-portal/vendor-portal.component';
import { EmployeePortalComponent } from './components/portal/employee-portal/employee-portal.component';
export const routes: Routes = [
  {
    path: 'portal',
    component: PortalComponent,
    children: [
      { path: 'customer', component: CustomerPortalComponent },
      { path: 'vendor', component: VendorPortalComponent },
      { path: 'employee', component: EmployeePortalComponent },
      { path: '', redirectTo: 'customer', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'portal' }
];