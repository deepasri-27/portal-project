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
               {path:'**',redirectTo:'inquiry',pathMatch:'full'}
            ]
          },
          {path:'financial-sheet',component:CustomerFinancialsheetComponent,
            children:[
              {path:'invoice',component:CustomerFinanceInvoiceComponent},
              {path:'payment-aging',component:CustomerFinanceAgingComponent},
              {path:'memo',component:CustomerFinanceMemoComponent},
              {path:'overall-sales',component:CustomerFinanceOsalesComponent},
              {path:'**',redirectTo:'invoice',pathMatch:'full'}
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
              {path:'**',redirectTo:'rfq',pathMatch:'full'}
            ]
          },
          {path:'financial-sheet',component:VendorFinancialsheetComponent,
            children:[
              {path:'invoice',component:VendorFinanceInvoiceComponent},
              {path:'payment-aging',component:VendorFinanceAgingComponent},
              {path:'memo',component:VendorFinanceMemoComponent},
               {path:'**',redirectTo:'invoice',pathMatch:'full'}
            ]
          },
          { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
       },
      { path: 'employee', component: EmployeePortalComponent,
        children:[
         {path:'profile',component:EmployeeProfileComponent},
          {path:'leave-request',component:EmployeeLeaveRequestComponent},
          {path:'payslip',component:EmployeePayslipComponent},
          { path: '**', redirectTo: 'leave-request', pathMatch: 'full' }

        ]
       },
      { path: 'welcome', component: WelcomeComponent},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'portal', pathMatch: 'full' },


];
