import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopTabComponent } from '../../shared/top-tab/top-tab.component';
import { TileData } from '../../shared/types/tile-data.types';
@Component({
  selector: 'app-vendor-financialsheet',
  imports: [RouterOutlet,TopTabComponent],
  templateUrl: './vendor-financialsheet.component.html',
  styleUrl: './vendor-financialsheet.component.css'
})
export class VendorFinancialsheetComponent {
  // tileData:TileData[]=[
  //     {label:"Invoice",url:"portal/vendor/financial-sheet/invoice"},
  //     {label:"Payments and Aging",url:"portal/vendor/financial-sheet/payment-aging"},
  //     {label:"Credit/Debit Memo",url:"portal/vendor/financial-sheet/memo"},
  
  //   ]
    
  tileData: TileData[] = [
    { label: 'Invoice', url: 'invoice' },
    { label: 'Payments and Aging', url: 'payment-aging' },
    { label: 'Credit/Debit Memo', url: 'memo' },

     ];

}
