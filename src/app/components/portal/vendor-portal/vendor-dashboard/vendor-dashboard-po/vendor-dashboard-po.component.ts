import { Component,OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { VpoDataType } from '../../../shared/types/vendor-po-data.types';
import { VendorPoService } from '../../../../../services/backend/vendor-po.service';
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

  constructor(private poService: VendorPoService) {}

  ngOnInit(): void {
    const vendorId = '0000100000'; // Replace with dynamic vendor ID if needed

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






