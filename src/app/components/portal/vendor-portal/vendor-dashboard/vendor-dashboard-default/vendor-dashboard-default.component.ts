import { Component } from '@angular/core';
import { TilesComponent } from '../../../shared/tiles/tiles.component';
import { VendorContextService } from '../../../../../services/context/vendorContext.context';
import { VendorProfileService } from '../../../../../services/backend/vendor-profile.service';

@Component({
  selector: 'app-vendor-dashboard-default',
  imports:[TilesComponent],
  templateUrl: './vendor-dashboard-default.component.html',
  styleUrl: './vendor-dashboard-default.component.css'
})
export class VendorDashboardDefaultComponent {

  constructor(
    private profileService: VendorProfileService,
    private vendorContextService: VendorContextService,
  ){
      this.profileService.getVendorProfile(vendorContextService.getVendorId() || '').subscribe({
      next: (data:any) => {
        this.vendorName = data.profile.name;
        console.log(this.vendorName);
      },
      error: (err) => {
        console.error('Error fetching vendor profile:', err);
      }
    });
  }

  vendorName = '';
  portalName = "Vendor Dashboard";
  vendorDashboardTiles = [
    {
      title: 'Request for Quotation',
      description: 'Submit and view your quotations easily.',
      icon: 'fas fa-file-signature',
      route: 'portal/vendor/dashboard/rfq'
    },
    {
      title: 'Purchase Order',
      description: 'Track and manage your purchase orders.',
      icon: 'fas fa-shopping-cart',
      route: 'portal/vendor/dashboard/purchase-order'
    },
    {
      title: 'Goods Request',
      description: 'Raise requests for goods delivery.',
      icon: 'fas fa-boxes',
      route: 'portal/vendor/dashboard/goods-request'
    }
  ];
}