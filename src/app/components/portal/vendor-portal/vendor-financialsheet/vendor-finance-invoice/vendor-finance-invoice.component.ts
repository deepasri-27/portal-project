import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { VinvoiceDataType } from '../../../shared/types/vendor-invoice-data.types';
import { VendorInvoiceService } from '../../../../../services/backend/vendor-invoices.service';
import { VendorContextService } from '../../../../../services/context/vendorContext.context';
@Component({
  selector: 'app-vendor-finance-invoice',
  imports: [DataTableComponent],
  templateUrl: './vendor-finance-invoice.component.html',
  styleUrl: './vendor-finance-invoice.component.css'
})
export class VendorFinanceInvoiceComponent {
   titles: string[] = [
    'Vendor ID', 'Invoice No', 'Invoice Date', 'Total Amount', 'Currency',
    'Payment Terms', 'PO No', 'PO Item', 'Material No', 'Description',
    'Quantity', 'Unit Price', 'Unit'
  ];
  keys: string[] = [
    'vendorId', 'invoiceNo', 'invoiceDate', 'totalAmount', 'currency',
    'paymentTerms', 'poNo', 'poItem', 'materialNo', 'description',
    'quantity', 'unitPrice', 'unit'
  ];
  data: VinvoiceDataType[] = [];

  constructor(
    private invoiceService: VendorInvoiceService,
    private vendorContextService: VendorContextService
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

}



