import { Component,OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { VpoDataType } from '../../../shared/types/vendor-po-data.types';
import { VendorPoService } from '../../../../../services/backend/vendor-po.service';
import { VendorContextService } from '../../../../../services/context/vendorContext.context';
import { FilterType } from '../../../shared/types/filter.types';
@Component({
  selector: 'app-vendor-dashboard-po',
  imports: [DataTableComponent],
  templateUrl: './vendor-dashboard-po.component.html',
  styleUrl: './vendor-dashboard-po.component.css'
})
export class VendorDashboardPoComponent {
titles: string[] = [
    'Vendor ID','Delivery Date','Doc Date','Material','Unit', 'PO Number','Item Number'
  ];
  keys :string[]=['vendorId','deliveryDate','docDate','material','unit', 'poNumber','itemNumber'];
  data: VpoDataType[] = [];
  tableTitle: string = "Purchase Order";
  filters:FilterType[]=[
{
      filterType: 'search',
      field: 'poNumber',
      label: 'Search by Purchase Order Number'
    },
    {
      filterType: 'dateRange',
      field: 'docDate',
      label: 'Filter by Doc Date'
    }

]

  constructor(
    private poService: VendorPoService,
    private vendorContextService: VendorContextService
  ) {}

  ngOnInit(): void {
    const vendorId = this.vendorContextService.getVendorId() || '';

    this.poService.getPoByVendorId(vendorId).subscribe({
      next: (res) => {
        if (res?.status === 'success') {
          this.data = res.purchase;
          
        }
      },
      error: (err) => {
        console.error('Error fetching PO data:', err);
      }
    });
  }
}






