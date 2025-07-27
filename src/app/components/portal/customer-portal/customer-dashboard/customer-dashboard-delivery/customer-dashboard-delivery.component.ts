import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { CustDeliveryService } from '../../../../../services/backend/cust-delivery.service';
import { CustDeliveryItem } from '../../../shared/types/customer-delivery-data.type';
@Component({
  selector: 'app-customer-dashboard-delivery',
  imports: [DataTableComponent],
  templateUrl: './customer-dashboard-delivery.component.html',
  styleUrl: './customer-dashboard-delivery.component.css'
})
export class CustomerDashboardDeliveryComponent {
 titles: string[] = ['vbeln', 'erdat', 'vstel', 'vkorg', 'lfart', 'lfdat', 'posnr', 'matnr', 'arktx', 'lfimg'];
  keys: string[] = ['vbeln', 'erdat', 'vstel', 'vkorg', 'lfart', 'lfdat', 'posnr', 'matnr', 'arktx', 'lfimg'];
  data: CustDeliveryItem[] = [];

  constructor(private deliveryService: CustDeliveryService) {}

  ngOnInit(): void {
    const customerId = '0000000002'; // Replace with dynamic value if needed

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








