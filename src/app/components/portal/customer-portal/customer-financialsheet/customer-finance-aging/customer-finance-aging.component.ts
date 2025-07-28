import { Component, OnInit } from '@angular/core';
import { CustPaymentAgingService } from '../../../../../services/backend/cust-paymentaging.service';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { CustAgingDataType } from '../../../shared/types/customer-paymentaging-data.type';
import { CustomerContextService } from '../../../../../services/context/customerContext.context';
@Component({
  selector: 'app-customer-finance-aging',
  imports: [DataTableComponent],
  templateUrl: './customer-finance-aging.component.html',
  styleUrl: './customer-finance-aging.component.css'
})
export class CustomerFinanceAgingComponent {
  titles: string[] = [
    'Invoice Number',        
    'Billing Date',          
    'Due Date',              
    'Net Amount',            
    'Currency',              
    'Aging (Days)',          
    'Aging Bucket'           
  ];

  keys: string[] = [
    'vbeln', 'fkdat', 'due_dt', 'netwr', 'waerk', 'aging', 'meaning'
  ];
  data:CustAgingDataType[] = [];
  tableTitle: string = "Payments and Aging";

  constructor(
    private agingService: CustPaymentAgingService,
    private customerContextService : CustomerContextService
  ) {}

  ngOnInit(): void {
    const customerId = this.customerContextService.getCustomerId() || '';

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



