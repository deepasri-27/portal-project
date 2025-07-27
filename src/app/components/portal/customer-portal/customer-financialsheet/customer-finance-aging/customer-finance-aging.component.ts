import { Component, OnInit } from '@angular/core';
import { CustPaymentAgingService } from '../../../../../services/backend/cust-paymentaging.service';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { CustAgingDataType } from '../../../shared/types/customer-paymentaging-data.type';
@Component({
  selector: 'app-customer-finance-aging',
  imports: [DataTableComponent],
  templateUrl: './customer-finance-aging.component.html',
  styleUrl: './customer-finance-aging.component.css'
})
export class CustomerFinanceAgingComponent {
 titles: string[] = [
    'vbeln', 'fkdat', 'due_dt', 'netwr', 'waerk', 'aging', 'meaning'
  ];

  keys: string[] = [
    'vbeln', 'fkdat', 'due_dt', 'netwr', 'waerk', 'aging', 'meaning'
  ];

  data: CustAgingDataType[] = [];

  constructor(private agingService: CustPaymentAgingService) {}

  ngOnInit(): void {
    const customerId = '0000000002'; // Replace this with dynamic logic if needed

    this.agingService.getAgingByCustomerId(customerId).subscribe({
      next: (res) => {
        if (res?.success) {
          this.data = res.data;
          console.log('Aging Data:', this.data);
        }
      },
      error: (err) => {
        console.error('Error fetching aging data:', err);
      }
    });
  }
}



