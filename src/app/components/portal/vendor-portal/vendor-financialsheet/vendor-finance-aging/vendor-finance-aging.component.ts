import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { VendorPaymentAgingService } from '../../../../../services/backend/vendor-paymentaging.service';
import { VagingDataType } from '../../../shared/types/vendor-aging-data-types';
import { VendorContextService } from '../../../../../services/context/vendorContext.context';
import { FilterType } from '../../../shared/types/filter.types';
@Component({
  selector: 'app-vendor-finance-aging',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './vendor-finance-aging.component.html',
  styleUrl: './vendor-finance-aging.component.css'
})
export class VendorFinanceAgingComponent {
  titles: string[] = [
    'Payment Doc', 'Doc Year', 'Payment Date', 'Entry Date', 'Vendor ID',
    'Amount Paid', 'Currency', 
    // 'Clearing Doc', 'Ref Doc No',
     'Due Date', 'Aging'
  ];
  keys: string[] = [
    'paymentDoc', 'docYear', 'paymentDate', 'enrtyDate', 'vendorId',
    'amountPaid', 'currency', 
    // 'clearingDoc', 'refDocNo',
     'dueDate', 'aging'
  ];
  data: VagingDataType[] = [];
  tableTitle: string = "Payments and Aging";
  filters:FilterType[]=[
{
      filterType: 'search',
      field: 'Payment Doc',
      label: 'Search by Payment Doc '
    },
    {
      filterType: 'dateRange',
      field: 'dueDate',
      label: 'Filter by Due Date'
    },
   
]


  constructor(
    private agingService: VendorPaymentAgingService,
    private vendorContextService: VendorContextService
  ) {}

  ngOnInit(): void {
    const vendorId = this.vendorContextService.getVendorId() || '';

    this.agingService.getAgingByVendorId(vendorId).subscribe({
      next: (res) => {
        if (res?.status === 'success') {
          this.data = res.aging;
        }
      },
      error: (err) => {
        console.error('Error fetching aging data:', err);
      }
    });
  }
}








