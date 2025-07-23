import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TileData } from '../../shared/types/tile-data.types';
@Component({
  selector: 'app-customer-financialsheet',
  imports: [RouterOutlet],
  templateUrl: './customer-financialsheet.component.html',
  styleUrl: './customer-financialsheet.component.css'
})
export class CustomerFinancialsheetComponent {

   tileData: TileData[] = [
    { label: 'Invoice', url: 'invoice' },
    { label: 'Payments and Aging', url: 'payment-aging' },
    { label: 'Credit/Debit Memo', url: 'memo' },
    {label:'Overall Sales Data',url:'overall-sales'}
     ];
}
