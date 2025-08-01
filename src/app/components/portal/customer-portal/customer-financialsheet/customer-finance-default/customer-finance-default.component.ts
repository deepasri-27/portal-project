import { Component } from '@angular/core';
import { TilesComponent } from '../../../shared/tiles/tiles.component';
import { CustProfileService } from '../../../../../services/backend/cust-profile.service';
import { CustomerContextService } from '../../../../../services/context/customerContext.context';
@Component({
  selector: 'app-customer-finance-default',
  imports: [TilesComponent],
  templateUrl: './customer-finance-default.component.html',
  styleUrl: './customer-finance-default.component.css'
})
export class CustomerFinanceDefaultComponent {
  
  constructor(
    private profileService: CustProfileService,
    private customerContextService: CustomerContextService,
  ){
      this.profileService.getCustomerProfile(customerContextService.getCustomerId() || '').subscribe({
      next: (response:any) => {
        this.customerName = response.data.name1;
        console.log(this.customerName);
      },
      error: (err) => {
        console.error('Error fetching vendor profile:', err);
      }
    });
  }
  
  customerName = 'User';
  portalName = "Customer Financial Sheet";
  customerFinanceTiles = [
  {
    title: 'Invoice',
    description: 'Access your invoice summary.',
    icon: 'fas fa-file-invoice',
    route: 'portal/customer/financial-sheet/invoice'
  },
  {
    title: 'Payments and Aging',
    description: 'Monitor receivables and payment aging.',
    icon: 'fas fa-coins',
    route: 'portal/customer/financial-sheet/payment-aging'
  },
  {
    title: 'Credit/Debit Memo',
    description: 'Review financial adjustments.',
    icon: 'fas fa-money-check-alt',
    route: 'portal/customer/financial-sheet/memo'
  },
  {
    title: 'Overall Sales Data',
    description: 'Analyze total sales and performance metrics.',
    icon: 'fas fa-chart-line',
    route: 'portal/customer/financial-sheet/overall-sales'
  }
];
}
