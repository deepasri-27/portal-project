import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopTabComponent } from '../../shared/top-tab/top-tab.component';
import { TileData } from '../../shared/types/tile-data.types';

@Component({
  selector: 'app-vendor-dashboard',
  imports: [RouterOutlet,TopTabComponent],
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.css'
})
export class VendorDashboardComponent {

  tileData:TileData[]=[
    {label:"Request For Quotation",url:"portal/vendor/dashboard/rfq"},
    {label:"Purchase Order",url:"portal/vendor/dashboard/purchase-order"},
    {label:"Goods Request",url:"portal/vendor/dashboard/goods-request"},

  ]

}
