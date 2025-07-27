import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { CustSalesDataType } from '../../../shared/types/customer-sales-data.type';
import { CustSalesService } from '../../../../../services/backend/cust-sales.service';
import { CustomerContextService } from '../../../../../services/context/customerContext.context';
@Component({
  selector: 'app-customer-dashboard-sales',
  imports: [DataTableComponent],
  templateUrl: './customer-dashboard-sales.component.html',
  styleUrl: './customer-dashboard-sales.component.css'
})
export class CustomerDashboardSalesComponent {
  titles: string[] = ['vbeln', 'erdat', 'auart', 'netwr','waerk','vdat','ernam', 'posnr','matnr','arktx','kwmeng', 'vrkme'];
  keys: string[] = ['vbeln', 'erdat', 'auart', 'netwr','waerk','vdat','ernam', 'posnr','matnr','arktx','kwmeng', 'vrkme'];
  data: CustSalesDataType[] = [];

  constructor(
    private salesService: CustSalesService,
    private customerContextService: CustomerContextService
  ) {}

  ngOnInit(): void {
    const customerId = this.customerContextService.getCustomerId() || '';

    this.salesService.getSalesByCustomerId(customerId).subscribe({
      next: (res) => {
        if (res?.success) {
          this.data = res.data;
          console.log(this.data);
        }
      },
      error: (err) => {
        console.error('Error fetching sales data:', err);
      }
    });
  }
}





