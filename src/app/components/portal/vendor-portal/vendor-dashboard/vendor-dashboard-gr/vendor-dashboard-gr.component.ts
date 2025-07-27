import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { VendorGoodsService } from '../../../../../services/backend/vendor-goods.service';
import { VgoodsDataType } from '../../../shared/types/vendor-gr-data.types';
import { VendorContextService } from '../../../../../services/context/vendorContext.context';


@Component({
  selector: 'app-vendor-dashboard-gr',
   standalone: true,
  imports: [DataTableComponent],
  templateUrl: './vendor-dashboard-gr.component.html', 
  styleUrl: './vendor-dashboard-gr.component.css'
})
export class VendorDashboardGrComponent {
titles: string[] = ['Material Doc', 'Doc Year', 'Post Date', 'Entry Date', 'PO Number', 'Po Iteam', 'Material','Quantity','Unit','Vendor ID'];
  keys: string[] = ['materialDoc', 'docYear', 'postDate', 'entryDate', 'poNumber', 'poItem', 'material','quantity','unit','vendorId'];
  data: VgoodsDataType[] = [];

  constructor(
    private goodsService: VendorGoodsService,
    private vendorContextService: VendorContextService
  ) {}

  ngOnInit(): void {
    const vendorId = this.vendorContextService.getVendorId() || '';

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




