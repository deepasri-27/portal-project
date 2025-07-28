import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { CustOverallSalesService } from '../../../../../services/backend/cust-overallsales.services';
import { OverallSalesDataType } from '../../../shared/types/customer-overallsales-data.type';
import { CustomerContextService } from '../../../../../services/context/customerContext.context';

@Component({
  selector: 'app-customer-finance-osales',
  imports: [DataTableComponent],
  templateUrl: './customer-finance-osales.component.html',
  styleUrl: './customer-finance-osales.component.css'
})
export class CustomerFinanceOsalesComponent {
  titles: string[] = [
  'Currency',                 
  'Sales Document Type',      
  'Customer Number',         
  'Sales Organization',      
  'Record Type',             
  'Document Number',         
  'Document Date',           
  'Total Orders',            
  'Total Order Value',       
  'Total Billed Amount'      
];


  keys: string[] = [
    'waerk', 'auart', 'kunnr', 'vkorg', 'record_type',
    'document_no', 'doc_date', 'total_orders', 'total_order_value', 'total_billed'
  ];

  data: OverallSalesDataType[] = [];

  constructor(
    private overallSalesService: CustOverallSalesService,
    private customerContextService: CustomerContextService
  ) {}

  ngOnInit(): void {
    const customerId = this.customerContextService.getCustomerId() || '';
    this.overallSalesService.getOverallSalesByCustomerId(customerId).subscribe({
      next: (res) => {
        if (res?.success) {
          this.data = res.data;
          console.log(this.data);
        }
      },
      error: (err) => {
        console.error('Error fetching overall sales data:', err);
      }
    });
  }
}


