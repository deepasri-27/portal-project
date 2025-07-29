import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { CustInvoiceDataType } from '../../../shared/types/customer-invoice-data.type';
import { CustInvoiceService } from '../../../../../services/backend/cust-invoice.service';
import { CustomerContextService } from '../../../../../services/context/customerContext.context';
import { CustInvoicePdfService } from '../../../../../services/backend/cust-invoicepdf.service';
// import { VendorInvoicePdfService } from '../../../../../services/backend/vendor-invoicepdf.service';

@Component({
  selector: 'app-customer-finance-invoice',
  imports: [DataTableComponent],
  templateUrl: './customer-finance-invoice.component.html',
  styleUrl: './customer-finance-invoice.component.css'
})
export class CustomerFinanceInvoiceComponent {
  titles: string[] = [
    'Invoice Number',           
    'Billing Date',            
    'Total Net Amount',        
    'Currency',                 
    'Customer Number',         
    'Sales Organization',      
    'Pricing Document',         
    'Billing Type',             
    'Item Number',              
    'Material Number',          
    'Material Description',     
    'Billed Quantity',          
    'Sales Unit',               
    'Item Net Value',           
    'Pricing Date',             
    'Created Date',             
    'Created By'                
  ];
  
  keys: string[] = [
    'vbeln', 'fkdat', 'netwr', 'waerk', 'kunag', 'vkorg',
    'knumv', 'fkart', 'posnr', 'matnr', 'arktx',
    'fkimg', 'vrkme', 'item_netwr', 'prsdt','erdat','ernam'
  ];
  
  data: CustInvoiceDataType[] = [];
  tableTitle: string = "Invoice Data";

  constructor(
    private invoiceService: CustInvoiceService,
    private customerContextService: CustomerContextService,
    private invoicePdfService: CustInvoicePdfService
  ) {}

  ngOnInit(): void {
    const customerId = this.customerContextService.getCustomerId() || '';

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
  onDownload(invoiceId: string) {
    this.invoicePdfService.downloadInvoicePdf(invoiceId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Invoice_${invoiceId}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error('PDF download failed:', err)
    });
  }
}






