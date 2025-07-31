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
import { CustomerDashboardInquiryComponent } from './components/portal/customer-portal/customer-dashboard/customer-dashboard-inquiry/customer-dashboard-inquiry.component';
import { CustomerDashboardSalesComponent } from './components/portal/customer-portal/customer-dashboard/customer-dashboard-sales/customer-dashboard-sales.component';
import { CustomerDashboardDeliveryComponent } from './components/portal/customer-portal/customer-dashboard/customer-dashboard-delivery/customer-dashboard-delivery.component';
import { CustomerFinanceInvoiceComponent } from './components/portal/customer-portal/customer-financialsheet/customer-finance-invoice/customer-finance-invoice.component';
import { CustomerFinanceAgingComponent } from './components/portal/customer-portal/customer-financialsheet/customer-finance-aging/customer-finance-aging.component';
import { CustomerFinanceMemoComponent } from './components/portal/customer-portal/customer-financialsheet/customer-finance-memo/customer-finance-memo.component';
import { CustomerFinanceOsalesComponent } from './components/portal/customer-portal/customer-financialsheet/customer-finance-osales/customer-finance-osales.component';
import { VendorDashboardRfqComponent } from './components/portal/vendor-portal/vendor-dashboard/vendor-dashboard-rfq/vendor-dashboard-rfq.component';
import { VendorDashboardPoComponent } from './components/portal/vendor-portal/vendor-dashboard/vendor-dashboard-po/vendor-dashboard-po.component';
import { VendorDashboardGrComponent } from './components/portal/vendor-portal/vendor-dashboard/vendor-dashboard-gr/vendor-dashboard-gr.component';
import { VendorFinanceInvoiceComponent } from './components/portal/vendor-portal/vendor-financialsheet/vendor-finance-invoice/vendor-finance-invoice.component';
import { VendorFinanceAgingComponent } from './components/portal/vendor-portal/vendor-financialsheet/vendor-finance-aging/vendor-finance-aging.component';
import { VendorFinanceMemoComponent } from './components/portal/vendor-portal/vendor-financialsheet/vendor-finance-memo/vendor-finance-memo.component';
import { VendorDashboardDefaultComponent } from './components/portal/vendor-portal/vendor-dashboard/vendor-dashboard-default/vendor-dashboard-default.component';
import { VendorFinanceDefaultComponent } from './components/portal/vendor-portal/vendor-financialsheet/vendor-finance-default/vendor-finance-default.component';
import { CustomerDashboardDefaultComponent } from './components/portal/customer-portal/customer-dashboard/customer-dashboard-default/customer-dashboard-default.component';
import { CustomerFinanceDefaultComponent } from './components/portal/customer-portal/customer-financialsheet/customer-finance-default/customer-finance-default.component';
import { EmployeeDashboardComponent } from './components/portal/employee-portal/employee-dashboard/employee-dashboard.component';
import { EmployeeDefaultComponent } from './components/portal/employee-portal/employee-dashboard/employee-default/employee-default.component';
import { EmployeePayslipComponent } from './components/portal/employee-portal/employee-dashboard/employee-payslip/employee-payslip.component';
import { EmployeeLeaveRequestComponent } from './components/portal/employee-portal/employee-dashboard/employee-leave-request/employee-leave-request.component';
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
          {path:'dashboard',component:CustomerDashboardComponent,
            children:[
              {path:'inquiry',component:CustomerDashboardInquiryComponent},
              {path:'sales-order',component:CustomerDashboardSalesComponent},
              {path:'delivery',component:CustomerDashboardDeliveryComponent},
              {path: 'default', component: CustomerDashboardDefaultComponent},
               {path:'**',redirectTo:'default',pathMatch:'full'}
            ]
          },
          {path:'financial-sheet',component:CustomerFinancialsheetComponent,
            children:[
              {path:'invoice',component:CustomerFinanceInvoiceComponent},
              {path:'payment-aging',component:CustomerFinanceAgingComponent},
              {path:'memo',component:CustomerFinanceMemoComponent},
              {path:'overall-sales',component:CustomerFinanceOsalesComponent},
              {path: 'default', component: CustomerFinanceDefaultComponent},
              {path:'**',redirectTo:'default',pathMatch:'full'}
            ]
          },
          { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
       },
      { path: 'vendor', component: VendorPortalComponent,
        children:[
          {path:'profile',component:VendorProfileComponent},
          {path:'dashboard',component:VendorDashboardComponent,
            children:[
              {path:'rfq',component:VendorDashboardRfqComponent},
              {path:'purchase-order',component:VendorDashboardPoComponent},
              {path:'goods-request',component:VendorDashboardGrComponent},
              {path: 'default', component: VendorDashboardDefaultComponent},
              {path:'**',redirectTo:'default',pathMatch:'full'}
            ]
          },
          {path:'financial-sheet',component:VendorFinancialsheetComponent,
            children:[
              {path:'invoice',component:VendorFinanceInvoiceComponent},
              {path:'payment-aging',component:VendorFinanceAgingComponent},
              {path:'memo',component:VendorFinanceMemoComponent},
              {path: 'default', component: VendorFinanceDefaultComponent},
              {path:'**',redirectTo:'default',pathMatch:'full'}
            ]
          },
          { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
       },
      { path: 'employee', component: EmployeePortalComponent,
        children:[
         {path:'dashboard',component:EmployeeDashboardComponent,
            children:[
              {path:'leave-request',component:EmployeeLeaveRequestComponent},
              {path:'payslip',component:EmployeePayslipComponent},
              {path: 'default', component: EmployeeDefaultComponent},
              {path:'**',redirectTo:'default',pathMatch:'full'}
            ]
         },
         {path:'profile', component:EmployeeProfileComponent},
         { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
       },
      { path: 'welcome', component: WelcomeComponent},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'portal', pathMatch: 'full' },


];
