import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { CustDeliveryService } from '../../../../../services/backend/cust-delivery.service';
import { CustDeliveryItem } from '../../../shared/types/customer-delivery-data.type';
import { CustomerContextService } from '../../../../../services/context/customerContext.context';
import { FilterType } from '../../../shared/types/filter.types';
@Component({
  selector: 'app-customer-dashboard-delivery',
  imports: [DataTableComponent],
  templateUrl: './customer-dashboard-delivery.component.html',
  styleUrl: './customer-dashboard-delivery.component.css'
})
export class CustomerDashboardDeliveryComponent {
  titles: string[] = [
    'Delivery Number',         
    'Created Date',            
    'Shipping Point',         
    'Sales Organization',      
    'Delivery Type',           
    'Delivery Date',           
    'Item Number',             
    'Material Number',         
    'Material Description',    
    'Delivered Quantity'       
  ];
  keys: string[] = ['vbeln', 'erdat', 'vstel', 'vkorg', 'lfart', 'lfdat', 'posnr', 'matnr', 'arktx', 'lfimg'];
  data: CustDeliveryItem[] = [];
  tableTitle = "List of Delivery";
  filters:FilterType[]=[
      {
        filterType: 'search',
        field: 'vbeln',
        label: 'Search by Delivery No '
      },
      {
        filterType: 'dateRange',
        field: 'lfdat',
        label: 'Filter by Delivery Date'
      },
      {
       filterType:'type',
       field:'lfart',
       label:'Filter by Delivery Type',
       options:['LF']
      } 
  ]

  constructor(
    private deliveryService: CustDeliveryService,
    private customerContextService: CustomerContextService
  ) {}

  ngOnInit(): void {
    const customerId = this.customerContextService.getCustomerId() || '';

    this.deliveryService.getDeliveriesByCustomerId(customerId).subscribe({
      next: (res) => {
        if (res?.success) {
          this.data = res.data;
          console.log(this.data);
        }
      },
      error: (err) => {
        console.error('Error fetching delivery data:', err);
      }
    });
  }
}








