import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { CustInquiryService } from '../../../../../services/backend/cust-inquiry.service';
import { custInquiryDatatype } from '../../../shared/types/customer-inquiry-data.types';
import { CustomerContextService } from '../../../../../services/context/customerContext.context';
import { FilterType } from '../../../shared/types/filter.types';
@Component({
  selector: 'app-customer-dashboard-inquiry',
  imports: [DataTableComponent],
  templateUrl: './customer-dashboard-inquiry.component.html',
  styleUrl: './customer-dashboard-inquiry.component.css'
})
export class CustomerDashboardInquiryComponent implements OnInit {
 titles: string[] =  [
  'Inquiry Number',         
  'Created Date',           
  'Inquiry Type',           
  'Net Value',              
  'Currency',               
  'Requested Date',         
  'Item Number',            
  'Material Number',        
  'Material Description',   
  'Order Quantity',         
  'Sales Unit'              
];

  keys: string[] = ['vbeln','erdat','auart','netwr','waerk','vdatu','posnr','matnr','arktx','kwmeng','vrkme'];
  data: custInquiryDatatype[] = [];
  tableTitle = "Inquiry Data";
  
filters:FilterType[]=[
    {
      filterType: 'search',
      field: 'vbeln',
      label: 'Search by Inquiry No '
    },
    {
      filterType: 'dateRange',
      field: 'erdat',
      label: 'Filter by Date'
    },
    {
     filterType:'type',
     field:'auart',
     label:'Filter by Inquiry Type',
     options:['AF']
    } 
]

  constructor(
    private inquiryService: CustInquiryService,
    private customerContextService: CustomerContextService
  ) {}

  ngOnInit(): void {
    const customerId = this.customerContextService.getCustomerId() || '';

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





