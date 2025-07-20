import { Component,OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { VendorMemoService } from '../../../../../services/backend/vendor-memo.service';
import { VmemoDataType } from '../../../shared/types/vendor-memo-data.types';

@Component({
  selector: 'app-vendor-finance-memo',
  imports: [DataTableComponent],
  templateUrl: './vendor-finance-memo.component.html',
  styleUrl: './vendor-finance-memo.component.css'
})
export class VendorFinanceMemoComponent {

  titles: string[] = [
    'memoDoc', 'docYear', 'postingDate', 'entryDate', 'vendorId',
    'memoType', 'amount', 'currency', 'referenceDocNo', 'docType', 'companyCode'
  ];
  keys: string[] = [
    'memoDoc', 'docYear', 'postingDate', 'entryDate', 'vendorId',
    'memoType', 'amount', 'currency', 'referenceDocNo', 'docType', 'companyCode'
  ];
  data: VmemoDataType[] = [];

  constructor(private memoService: VendorMemoService) {}

  ngOnInit(): void {
    const vendorId = '0000100000'; // Replace with dynamic vendor ID

    this.memoService.getMemosByVendorId(vendorId).subscribe({
      next: (res) => {
        if (res?.status === 'success') {
          this.data = res.memo;
          console.log(this.data)
        }
      },
      error: (err) => {
        console.error('Error fetching memo data:', err);
      }
    });
  }

}






