import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { VinvoiceDataType } from '../../../shared/types/vendor-invoice-data.types';
import { VendorInvoiceService } from '../../../../../services/backend/vendor-invoices.service';
import { VendorContextService } from '../../../../../services/context/vendorContext.context';
import { VendorInvoicePdfService } from '../../../../../services/backend/vendor-invoicepdf.service';
import { FilterType } from '../../../shared/types/filter.types';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-vendor-finance-invoice',
   standalone: true,
  imports: [DataTableComponent],
  templateUrl: './vendor-finance-invoice.component.html',
  styleUrl: './vendor-finance-invoice.component.css'
})
export class VendorFinanceInvoiceComponent {
   titles: string[] = [
    // 'Vendor ID',
     'Invoice No', 'Invoice Date', 'Total Amount', 'Currency',
    // 'Payment Terms',
     'PO No', 'PO Item', 'Material No', 'Description',
    'Quantity', 'Unit Price', 'Unit'
  ];
  keys: string[] = [
    // 'vendorId', 
    'invoiceNo', 'invoiceDate', 'totalAmount', 'currency',
    // 'paymentTerms', 
    'poNo', 'poItem', 'materialNo', 'description',
    'quantity', 'unitPrice', 'unit'
  ];
  data: VinvoiceDataType[] = [];
  tableTitle:string = "Vendor Invoice";
  filters:FilterType[]=[
{
      filterType: 'search',
      field: 'invoiceNo',
      label: 'Search by Invoice No '
    },
    {
      filterType: 'dateRange',
      field: 'invoiceDate',
      label: 'Filter by Invoice Date'
    }
]
  constructor(
    private invoiceService: VendorInvoiceService,
    private vendorContextService: VendorContextService,
    private invoicePdfService: VendorInvoicePdfService
  ) {}

  ngOnInit(): void {
    const vendorId = this.vendorContextService.getVendorId() || '';

    this.invoiceService.getInvoicesByVendorId(vendorId).subscribe({
      next: (res) => {
        if (res?.status === 'success') {
          this.data = res.invoices;
          console.log(this.data);
        }
      },
      error: (err) => {
        console.error('Error fetching invoice data:', err);
      }
    });
  }
   
  onDownload(invoiceId: string): void {
    this.invoicePdfService.downloadInvoicePdf(invoiceId).subscribe({
      next: (binaryData) => {
        // console.log(invoiceId);
        // const url = window.URL.createObjectURL(blob);
        // const link = document.createElement('a');
        // link.href = url;
         console.log(binaryData);
        // link.download = `Invoice_${invoiceId}.pdf`;
        // link.click();
        // window.URL.revokeObjectURL(url);
        const byteCharacters = atob(binaryData.pdfBase64); // Decode base64 string--get from backend
        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        saveAs(blob, 'invoice-'+invoiceId+'.pdf');
      },
      error: (err) => {
        console.error('PDF download failed:', err);
      }
    });
  }
}



