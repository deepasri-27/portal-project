import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { CustMemoService } from '../../../../../services/backend/cust-memo.service';
import { MemoItem } from '../../../shared/types/customer-memo-data.type';
@Component({
  selector: 'app-customer-finance-memo',
  imports: [DataTableComponent],
  templateUrl: './customer-finance-memo.component.html',
  styleUrl: './customer-finance-memo.component.css'
})
export class CustomerFinanceMemoComponent {
 titles: string[] = [
    'memoId', 'memoType', 'referenceDoc', 'customerId', 'customerName',
    'billingDate', 'createdDate', 'createdBy', 'currency', 'netValue',
    'taxAmount', 'salesOrg', 'distChannel', 'division'
  ];

  keys: string[] = [
    'memoId', 'memoType', 'referenceDoc', 'customerId', 'customerName',
    'billingDate', 'createdDate', 'createdBy', 'currency', 'netValue',
    'taxAmount', 'salesOrg', 'distChannel', 'division'
  ];

  data: MemoItem[] = [];

  constructor(private memoService: CustMemoService) {}

  ngOnInit(): void {
    const customerId = '0000100000'; // Replace with dynamic logic later

    this.memoService.getMemosByCustomerId(customerId).subscribe({
      next: (res) => {
        if (res?.success) {
          this.data = res.data;
          console.log(this.data);
        }
      },
      error: (err) => {
        console.error('Error fetching memo data:', err);
      }
    });
  }
}







