import { Component } from '@angular/core';
import { TilesComponent } from '../../../shared/tiles/tiles.component';

@Component({
  selector: 'app-customer-finance-default',
  imports: [TilesComponent],
  templateUrl: './customer-finance-default.component.html',
  styleUrl: './customer-finance-default.component.css'
})
export class CustomerFinanceDefaultComponent {
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
