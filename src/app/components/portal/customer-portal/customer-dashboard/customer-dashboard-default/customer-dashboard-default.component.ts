import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TilesComponent } from '../../../shared/tiles/tiles.component';
import { CustProfileService } from '../../../../../services/backend/cust-profile.service';
import { CustSalesService } from '../../../../../services/backend/cust-sales.service';
import { CustDeliveryService } from '../../../../../services/backend/cust-delivery.service';
import { CustInquiryService } from '../../../../../services/backend/cust-inquiry.service';
import { CustomerContextService } from '../../../../../services/context/customerContext.context';
import { CumulativeDataTile } from '../../../shared/types/cumulative-data.types';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-customer-dashboard-default',
  imports: [CommonModule, TilesComponent],
  templateUrl: './customer-dashboard-default.component.html',
  styleUrl: './customer-dashboard-default.component.css'
})
export class CustomerDashboardDefaultComponent implements OnInit {

  constructor(
    private profileService: CustProfileService,
    private salesService: CustSalesService,
    private deliveryService: CustDeliveryService,
    private inquiryService: CustInquiryService,
    private customerContextService: CustomerContextService,
  ){}

  // Tiles component inputs
  userName = 'User';
  userId = '';
  cumulativeData: CumulativeDataTile[] = [];

  ngOnInit() {
    const customerId = this.customerContextService.getCustomerId() || '';
    this.userId = customerId;
    
    // Load customer profile and cumulative data
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

    // Load cumulative data from multiple services
    forkJoin({
      sales: this.salesService.getSalesByCustomerId(customerId),
      deliveries: this.deliveryService.getDeliveriesByCustomerId(customerId),
      inquiries: this.inquiryService.getInquiriesByCustomerId(customerId)
    }).subscribe({
      next: (data) => {
        this.calculateCumulativeData(data);
      },
      error: (err) => {
        console.error('Error fetching cumulative data:', err);
        // Set default cumulative data if services fail
        this.setDefaultCumulativeData();
      }
    });
  }

  private calculateCumulativeData(data: any) {
    const cumulativeData: CumulativeDataTile[] = [];

    // Calculate Total Sales
    const sales = data.sales?.sales || [];
    const totalSales = sales.reduce((sum: number, sale: any) => {
      return sum + (parseFloat(sale.netwr) || 0);
    }, 0);

    if (totalSales > 0) {
      cumulativeData.push({
        icon: 'fas fa-chart-line',
        data: `$${(totalSales / 1000).toFixed(1)}K`,
        label1: 'Total Sales',
        label2: 'This year'
      });
    }

    // Calculate Active Orders
    const activeOrders = sales.filter((sale: any) => 
      sale.auart && !sale.auart.toLowerCase().includes('cancelled')
    );

    cumulativeData.push({
      icon: 'fas fa-shopping-cart',
      data: activeOrders.length,
      label1: 'Active Orders',
      label2: 'In progress'
    });

    // Calculate Deliveries
    const deliveries = data.deliveries?.deliveries || [];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const thisMonthDeliveries = deliveries.filter((delivery: any) => {
      const deliveryDate = new Date(delivery.lfdat || '');
      return deliveryDate.getMonth() === currentMonth && deliveryDate.getFullYear() === currentYear;
    });

    cumulativeData.push({
      icon: 'fas fa-truck',
      data: thisMonthDeliveries.length,
      label1: 'Deliveries',
      label2: 'This month'
    });

    // Calculate Inquiries
    const inquiries = data.inquiries?.inquiries || [];
    const pendingInquiries = inquiries.filter((inquiry: any) => 
      !inquiry.status || inquiry.status.toLowerCase().includes('pending')
    );

    if (pendingInquiries.length > 0) {
      cumulativeData.push({
        icon: 'fas fa-question-circle',
        data: pendingInquiries.length,
        label1: 'Pending Inquiries',
        label2: 'Awaiting response'
      });
    }

    this.cumulativeData = cumulativeData;
  }

  private setDefaultCumulativeData() {
    this.cumulativeData = [
      {
        icon: 'fas fa-chart-line',
        data: '$125K',
        label1: 'Total Sales',
        label2: 'This year'
      },
      {
        icon: 'fas fa-shopping-cart',
        data: 8,
        label1: 'Active Orders',
        label2: 'In progress'
      },
      {
        icon: 'fas fa-truck',
        data: 12,
        label1: 'Deliveries',
        label2: 'This month'
      },
      {
        icon: 'fas fa-question-circle',
        data: 3,
        label1: 'Pending Inquiries',
        label2: 'Awaiting response'
      }
    ];
  }

  customerDashboardTiles = [
    {
      title: 'Request for Quotation',
      description: 'Submit and view your quotations easily.',
      icon: 'fas fa-file-contract',
      route: 'portal/customer/dashboard/inquiry'
    },
    {
      title: 'Purchase Order',
      description: 'Track and manage your purchase orders.',
      icon: 'fas fa-shopping-cart',
      route: 'portal/customer/dashboard/sales-order'
    },
    {
      title: 'Goods Request',
      description: 'Raise requests for goods delivery.',
      icon: 'fas fa-boxes',
      route: 'portal/customer/dashboard/delivery'
    }
  ];
}
