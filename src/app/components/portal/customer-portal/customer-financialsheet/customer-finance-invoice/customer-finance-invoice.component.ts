import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { CustInvoiceDataType } from '../../../shared/types/customer-invoice-data.type';
import { CustInvoiceService } from '../../../../../services/backend/cust-invoice.service';
@Component({
  selector: 'app-customer-finance-invoice',
  imports: [DataTableComponent],
  templateUrl: './customer-finance-invoice.component.html',
  styleUrl: './customer-finance-invoice.component.css'
})
export class CustomerFinanceInvoiceComponent {
 titles: string[] = [
    'vbeln', 'fkdat', 'netwr', 'waerk', 'kunag', 'vkorg',
    'knumv', 'fkart', 'posnr', 'matnr', 'arktx',
    'fkimg', 'vrkme', 'item_netwr', 'prsdt','erdat','ernam'
  ];
  
  keys: string[] = [
    'vbeln', 'fkdat', 'netwr', 'waerk', 'kunag', 'vkorg',
    'knumv', 'fkart', 'posnr', 'matnr', 'arktx',
    'fkimg', 'vrkme', 'item_netwr', 'prsdt','erdat','ernam'
  ];
  
  data: CustInvoiceDataType[] = [];

  constructor(private invoiceService: CustInvoiceService) {}

  ngOnInit(): void {
    const customerId = '0000000002'; // Replace with dynamic logic later

    this.invoiceService.getInvoicesByCustomerId(customerId).subscribe({
      next: (res) => {
        if (res?.success) {
          this.data = res.data;
          console.log(this.data);
        }
      },
      error: (err) => {
        console.error('Error fetching invoice data:', err);
      }
    });
  }
}






