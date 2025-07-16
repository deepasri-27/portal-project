import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/portal/welcome/welcome.component';
import { PortalComponent } from './components/portal/portal.component';
import { CustomerPortalComponent } from './components/portal/customer-portal/customer-portal.component';
import { VendorPortalComponent } from './components/portal/vendor-portal/vendor-portal.component';
import { EmployeePortalComponent } from './components/portal/employee-portal/employee-portal.component';
import { VendorProfileComponent } from './components/portal/vendor-portal/vendor-profile/vendor-profile.component';
import { VendorDashboardComponent } from './components/portal/vendor-portal/vendor-dashboard/vendor-dashboard.component';
import { VendorFinancialsheetComponent } from './components/portal/vendor-portal/vendor-financialsheet/vendor-financialsheet.component';
import { CustomerProfileComponent } from './components/portal/customer-portal/customer-profile/customer-profile.component';
import { CustomerDashboardComponent } from './components/portal/customer-portal/customer-dashboard/customer-dashboard.component';
import { CustomerFinancialsheetComponent } from './components/portal/customer-portal/customer-financialsheet/customer-financialsheet.component';
import { EmployeeProfileComponent } from './components/portal/employee-portal/employee-profile/employee-profile.component';
import { EmployeeLeaveRequestComponent } from './components/portal/employee-portal/employee-leave-request/employee-leave-request.component';
import { EmployeePayslipComponent } from './components/portal/employee-portal/employee-payslip/employee-payslip.component';

export const routes: Routes = [
  // Route to WelcomeComponent at root path
 

  // Route group for portal and its children
  {
    path: 'portal',
    component: PortalComponent,
    children: [
      { path: 'customer', component: CustomerPortalComponent,
        children:[
          {path:'profile',component:CustomerProfileComponent},
          {path:'dashboard',component:CustomerDashboardComponent},
          {path:'financial-sheet',component:CustomerFinancialsheetComponent}
        ]
       },
      { path: 'vendor', component: VendorPortalComponent,
        children:[
          {path:'profile',component:VendorProfileComponent},
          {path:'dashboard',component:VendorDashboardComponent},
          {path:'financial-sheet',component:VendorFinancialsheetComponent}
        ]
       },
      { path: 'employee', component: EmployeePortalComponent,
        children:[
         {path:'profile',component:EmployeeProfileComponent},
          {path:'leave-request',component:EmployeeLeaveRequestComponent},
          {path:'payslip',component:EmployeePayslipComponent}
        ]
       },
      { path: 'welcome', component: WelcomeComponent},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'portal', pathMatch: 'full' },


];
