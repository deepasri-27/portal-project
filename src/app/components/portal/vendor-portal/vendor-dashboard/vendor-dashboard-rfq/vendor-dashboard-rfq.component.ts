import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { VendorRfqService } from '../../../../../services/backend/vendor-rfq.service';
import { VrfqDataType } from '../../../shared/types/vendor-rfq-data.types';

@Component({
  selector: 'app-vendor-dashboard-rfq',
  standalone: true,
  imports: [DataTableComponent,],
  templateUrl: './vendor-dashboard-rfq.component.html',
  styleUrls: ['./vendor-dashboard-rfq.component.css']
})
export class VendorDashboardRfqComponent implements OnInit {
  titles: string[] = [
    'poNumber', 'vendorId', 'docDate', 'itemNumber', 'material',
    'unit', 'description', 'deliveryDate'
  ];
  keys:string[]=['poNumber', 'vendorId', 'docDate', 'itemNumber', 'material',
    'unit', 'description', 'deliveryDate'];

  data: VrfqDataType[] = [];

  constructor(private rfqService: VendorRfqService) {}

  ngOnInit(): void {
    const vendorId = '0000100000'; // You can fetch this from login/session/localStorage

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
