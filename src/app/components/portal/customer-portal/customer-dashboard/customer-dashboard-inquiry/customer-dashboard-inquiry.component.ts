import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { CustInquiryService } from '../../../../../services/backend/cust-inquiry.service';
import { custInquiryDatatype } from '../../../shared/types/customer-inquiry-data.types';
@Component({
  selector: 'app-customer-dashboard-inquiry',
  imports: [DataTableComponent],
  templateUrl: './customer-dashboard-inquiry.component.html',
  styleUrl: './customer-dashboard-inquiry.component.css'
})
export class CustomerDashboardInquiryComponent implements OnInit {
 titles: string[] = ['vbeln','erdat','auart','netwr','waerk','vdatu','posnr','matnr','arktx','kwmeng','vrkme'];
  keys: string[] = ['vbeln','erdat','auart','netwr','waerk','vdatu','posnr','matnr','arktx','kwmeng','vrkme'];
  data: custInquiryDatatype[] = [];

  constructor(private inquiryService: CustInquiryService) {}

  ngOnInit(): void {
    const customerId = '0000000002'; // Replace with dynamic value later

    this.inquiryService.getInquiriesByCustomerId(customerId).subscribe({
      next: (res) => {
        if (res?.success) {
          this.data = res.data;
          console.log(this.data);
        }
      },
      error: (err) => {
        console.error('Error fetching inquiry data:', err);
      }
    });
  }
}





