import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TileData } from '../../shared/types/tile-data.types';
@Component({
  selector: 'app-customer-dashboard',
  imports: [RouterOutlet],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {
}
