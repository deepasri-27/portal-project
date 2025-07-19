import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { VendorGoodsService } from '../../../../../services/backend/vendor-goods.service';
import { VgoodsDataType } from '../../../shared/types/vendor-gr-data.types';


@Component({
  selector: 'app-vendor-dashboard-gr',
   standalone: true,
  imports: [DataTableComponent],
  templateUrl: './vendor-dashboard-gr.component.html',
  styleUrl: './vendor-dashboard-gr.component.css'
})
export class VendorDashboardGrComponent {
titles: string[] = ['materialDoc', 'docYear', 'postDate', 'entryDate', 'poNumber', 'poItem', 'material','quantity','unit','vendorId'];
  keys: string[] = ['materialDoc', 'docYear', 'postDate', 'entryDate', 'poNumber', 'poItem', 'material','quantity','unit','vendorId'];
  data: VgoodsDataType[] = [];

  constructor(private goodsService: VendorGoodsService) {}

  ngOnInit(): void {
    const vendorId = '0000100000'; // Replace with dynamic vendor ID

    this.goodsService.getGoodsByVendorId(vendorId).subscribe({
      next: (res) => {
        if (res?.status === 'success') {
          this.data = res.goods;
        }
      },
      error: (err) => {
        console.error('Error fetching Goods Request data:', err);
      }
    });
  }
}




