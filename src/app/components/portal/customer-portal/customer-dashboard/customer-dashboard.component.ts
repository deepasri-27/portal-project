import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopTabComponent } from '../../shared/top-tab/top-tab.component';
import { TileData } from '../../shared/types/tile-data.types';
@Component({
  selector: 'app-customer-dashboard',
  imports: [RouterOutlet,TopTabComponent],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {
  tileData: TileData[] = [
  { label: 'Inquiry Data', url: 'inquiry' },
  { label: 'Sales Order Data', url: 'sales-order' },
  { label: 'List Of Delivery', url: 'delivery' }
];
}
