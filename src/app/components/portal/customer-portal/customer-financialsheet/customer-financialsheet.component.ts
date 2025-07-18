import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopTabComponent } from '../../shared/top-tab/top-tab.component';
import { TileData } from '../../shared/types/tile-data.types';
@Component({
  selector: 'app-customer-financialsheet',
  imports: [RouterOutlet,TopTabComponent],
  templateUrl: './customer-financialsheet.component.html',
  styleUrl: './customer-financialsheet.component.css'
})
export class CustomerFinancialsheetComponent {
  tileData:TileData[]=[
      {label:"Invoice",url:"portal/customer/financial-sheet/invoice"},
      {label:"Payments and Aging",url:"portal/customer/financial-sheet/payment-aging"},
      {label:"Credit/Debit Memo",url:"portal/customer/financial-sheet/memo"},
      {label:"Overall Sales Data",url:"portal/customer/financial-sheet/overall-sales"},
    ]
}
