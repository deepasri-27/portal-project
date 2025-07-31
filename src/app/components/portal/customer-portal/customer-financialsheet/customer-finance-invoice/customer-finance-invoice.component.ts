import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { CustInvoiceDataType } from '../../../shared/types/customer-invoice-data.type';
import { CustInvoiceService } from '../../../../../services/backend/cust-invoice.service';
import { CustomerContextService } from '../../../../../services/context/customerContext.context';
import { CustInvoicePdfService } from '../../../../../services/backend/cust-invoicepdf.service';
import { saveAs } from 'file-saver';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-customer-finance-invoice',
  imports: [DataTableComponent, CommonModule],
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
    'fkimg', 'vrkme', 'item_netwr', 'prsdt', 'erdat', 'ernam'
  ];

  data: CustInvoiceDataType[] = [];
  tableTitle: string = "Customer Invoice";

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
        console.error('Error fetching customer invoice data:', err);
      }
    });
  }

  onDownload(invoiceId: string): void {
    this.invoicePdfService.downloadInvoicePdf(invoiceId).subscribe({
      next: (binaryData) => {
        const base64 = binaryData?.base64;
        console.log("binary data value");
        console.log(binaryData);
        if (!base64 || typeof base64 !== 'string') {
          console.error('Invalid or missing base64 data');
          return;
        }

        try {
          const cleanedBase64 = base64.replace(/\s/g, '');
          const byteCharacters = atob(cleanedBase64);
          const byteNumbers = Array.from(byteCharacters, c => c.charCodeAt(0));
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });

          saveAs(blob, `invoice-${invoiceId}.pdf`);
        } catch (error) {
          console.error('Base64 decoding failed:', error);
        }
      },
      error: (err) => {
        console.error('PDF download failed:', err);
      }
    });
  }
}




