import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { VendorRfqService } from '../../../../../services/backend/vendor-rfq.service';
import { VrfqDataType } from '../../../shared/types/vendor-rfq-data.types';
import { VendorContextService } from '../../../../../services/context/vendorContext.context';
import { FilterType } from '../../../shared/types/filter.types';

@Component({
  selector: 'app-vendor-dashboard-rfq',
  standalone: true,
  imports: [DataTableComponent,],
  templateUrl: './vendor-dashboard-rfq.component.html',
  styleUrls: ['./vendor-dashboard-rfq.component.css']
})
export class VendorDashboardRfqComponent implements OnInit {
  titles: string[] = [
    'PO Number', 'Vendor ID', 'Doc Date', 'Item Nmber', 'Material',
    'Unit', 'Description', 'Delivery Date'
  ];
  keys:string[]=['poNumber', 'vendorId', 'docDate', 'itemNumber', 'material',
    'unit', 'description', 'deliveryDate'];

  data: VrfqDataType[] = [];
  tableTitle: string = "Request For Quotation";
  filters: FilterType[] = [
    {
      filterType: 'search',
      field: 'vendorId',
      label: 'Search by Vendor ID'
    },
    {
      filterType: 'dateRange',
      field: 'docDate',
      label: 'Filter by Doc Date'
    }
  ];

  constructor(
    private rfqService: VendorRfqService,
    private vendorContextService: VendorContextService
  ) {}

  ngOnInit(): void {
    const vendorId = this.vendorContextService.getVendorId() || '';

    this.rfqService.getRfqByVendorId(vendorId).subscribe({
      next: (res) => {
        if (res?.status === 'success') {
          this.data = res.rfq;
        }
      },
      error: (err) => {
        console.error('Error fetching RFQ data:', err);
      }
    });
  }
}
