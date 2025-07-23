import { Component } from '@angular/core';
import { TilesComponent } from '../../../shared/tiles/tiles.component';

@Component({
  selector: 'app-vendor-finance-default',
  imports: [TilesComponent],
  templateUrl: './vendor-finance-default.component.html',
  styleUrl: './vendor-finance-default.component.css'
})
export class VendorFinanceDefaultComponent {
  portalName = "Vendor Financial Sheet";
  vendorFinancialTiles = [
  {
    title: 'Invoice',
    description: 'View and manage your invoices.',
    icon: 'fas fa-file-invoice-dollar',
    route: 'portal/vendor/financial-sheet/invoice'
  },
  {
    title: 'Payments and Aging',
    description: 'Track payment history and outstanding dues.',
    icon: 'fas fa-wallet',
    route: 'portal/vendor/financial-sheet/payment-aging'
  },
  {
    title: 'Credit/Debit Memo',
    description: 'Manage credit and debit memos issued.',
    icon: 'fas fa-receipt',
    route: 'portal/vendor/financial-sheet/memo'
  }
];
}
