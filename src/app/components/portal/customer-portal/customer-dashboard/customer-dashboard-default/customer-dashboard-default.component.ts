import { Component } from '@angular/core';
import { TilesComponent } from '../../../shared/tiles/tiles.component';

@Component({
  selector: 'app-customer-dashboard-default',
  imports: [TilesComponent],
  templateUrl: './customer-dashboard-default.component.html',
  styleUrl: './customer-dashboard-default.component.css'
})
export class CustomerDashboardDefaultComponent {
  portalName = "Customer Dashboard";
  customerDashboardTiles = [
  {
    title: 'Inquiry Data',
    description: 'Check customer inquiries and initial leads.',
    icon: 'fas fa-search-dollar',
    route: 'portal/customer/dashboard/inquiry'
  },
  {
    title: 'Sales Order Data',
    description: 'Review details of placed sales orders.',
    icon: 'fas fa-file-alt',
    route: 'portal/customer/dashboard/sales-order'
  },
  {
    title: 'List Of Delivery',
    description: 'Track delivery schedules and fulfillment.',
    icon: 'fas fa-truck-loading',
    route: 'portal/customer/dashboard/delivery'
  }
];
}
