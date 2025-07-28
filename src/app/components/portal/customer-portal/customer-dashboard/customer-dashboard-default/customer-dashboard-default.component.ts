import { Component } from '@angular/core';
import { TilesComponent } from '../../../shared/tiles/tiles.component';
import { CustProfileService } from '../../../../../services/backend/cust-profile.service';
import { CustomerContextService } from '../../../../../services/context/customerContext.context';

@Component({
  selector: 'app-customer-dashboard-default',
  imports: [TilesComponent],
  templateUrl: './customer-dashboard-default.component.html',
  styleUrl: './customer-dashboard-default.component.css'
})
export class CustomerDashboardDefaultComponent {

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

  customerName = '';
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
