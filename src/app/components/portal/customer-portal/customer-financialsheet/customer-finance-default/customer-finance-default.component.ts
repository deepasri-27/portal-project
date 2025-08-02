import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TilesComponent } from '../../../shared/tiles/tiles.component';
import { CustProfileService } from '../../../../../services/backend/cust-profile.service';
import { CustomerContextService } from '../../../../../services/context/customerContext.context';
import { CumulativeDataTile } from '../../../shared/types/cumulative-data.types';

@Component({
  selector: 'app-customer-finance-default',
  imports: [CommonModule, TilesComponent],
  templateUrl: './customer-finance-default.component.html',
  styleUrl: './customer-finance-default.component.css'
})
export class CustomerFinanceDefaultComponent implements OnInit {
  
  constructor(
    private profileService: CustProfileService,
    private customerContextService: CustomerContextService,
  ){}

  // Tiles component inputs
  userName = 'User';
  userId = '';
  cumulativeData: CumulativeDataTile[] = [];

  ngOnInit() {
    const customerId = this.customerContextService.getCustomerId() || '';
    this.userId = customerId;
    
    // Load customer profile
    this.loadCustomerData(customerId);
  }

  private loadCustomerData(customerId: string) {
    // Load profile data
    this.profileService.getCustomerProfile(customerId).subscribe({
      next: (response: any) => {
        this.userName = response.data.name1 || 'User';
      },
      error: (err) => {
        console.error('Error fetching customer profile:', err);
      }
    });

    // Set default cumulative data for customer financial
    this.setDefaultCumulativeData();
  }

  private setDefaultCumulativeData() {
    this.cumulativeData = [
      {
        icon: 'fas fa-file-invoice',
        data: 18,
        label1: 'Total Invoices',
        label2: 'This month'
      },
      {
        icon: 'fas fa-coins',
        data: '₹3.2L',
        label1: 'Outstanding Amount',
        label2: 'Pending payment'
      },
      {
        icon: 'fas fa-chart-line',
        data: '₹12.5L',
        label1: 'Total Sales',
        label2: 'This quarter'
      }
    ];
  }
  
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
