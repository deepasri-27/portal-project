import { Component,OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { VendorMemoService } from '../../../../../services/backend/vendor-memo.service';
import { VmemoDataType } from '../../../shared/types/vendor-memo-data.types';
import { VendorContextService } from '../../../../../services/context/vendorContext.context';
import { FilterType } from '../../../shared/types/filter.types';
@Component({
  selector: 'app-vendor-finance-memo',
  imports: [DataTableComponent],
  templateUrl: './vendor-finance-memo.component.html',
  styleUrl: './vendor-finance-memo.component.css'
})
export class VendorFinanceMemoComponent {

  titles: string[] = [
    'Memo Doc', 'Doc Year', 'Posting Date', 'Entry Date', 'Vendor ID',
    'Memo Type', 'Amount', 'Currency', 
    // 'Reference Doc No', 
    'Doc Type', 'Company Code'
  ];
  keys: string[] = [
    'memoDoc', 'docYear', 'postingDate', 'entryDate', 'vendorId',
    'memoType', 'amount', 'currency', 
    // 'referenceDocNo', 
    'docType', 'companyCode'
  ];
  data: VmemoDataType[] = [];
  tableTitle: string = "Credit / Debit Memo";
  filters:FilterType[]=[
{
      filterType: 'search',
      field: 'memoDoc',
      label: 'Search by Memo Id '
    },
    {
      filterType: 'dateRange',
      field: 'postingDate',
      label: 'Filter by Posting Date'
    },
    {
     filterType:'type',
     field:'memoType',
     label:'Filter by Memo Type',
     options:['RE']
    }
]

  constructor(
    private memoService: VendorMemoService,
    private vendorContextService: VendorContextService
  ) {}

  ngOnInit(): void {
    const vendorId = this.vendorContextService.getVendorId() || '';

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






