import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TilesComponent } from '../../../shared/tiles/tiles.component';
import { VendorContextService } from '../../../../../services/context/vendorContext.context';
import { VendorProfileService } from '../../../../../services/backend/vendor-profile.service';
import { CumulativeDataTile } from '../../../shared/types/cumulative-data.types';

@Component({
  selector: 'app-vendor-dashboard-default',
  imports: [CommonModule, TilesComponent],
  templateUrl: './vendor-dashboard-default.component.html',
  styleUrl: './vendor-dashboard-default.component.css'
})
export class VendorDashboardDefaultComponent implements OnInit {

  constructor(
    private profileService: VendorProfileService,
    private vendorContextService: VendorContextService,
  ){}

  // Tiles component inputs
  userName = 'User';
  userId = '';
  cumulativeData: CumulativeDataTile[] = [];

  ngOnInit() {
    const vendorId = this.vendorContextService.getVendorId() || '';
    this.userId = vendorId;
    
    // Load vendor profile
    this.loadVendorData(vendorId);
  }

  private loadVendorData(vendorId: string) {
    // Load profile data
    this.profileService.getVendorProfile(vendorId).subscribe({
      next: (data: any) => {
        this.userName = data.profile.name || 'User';
      },
      error: (err) => {
        console.error('Error fetching vendor profile:', err);
      }
    });

    // Set default cumulative data for vendor
    this.setDefaultCumulativeData();
  }

  private setDefaultCumulativeData() {
    this.cumulativeData = [
      {
        icon: 'fas fa-file-signature',
        data: 12,
        label1: 'Active RFQs',
        label2: 'Pending response'
      },
      {
        icon: 'fas fa-shopping-cart',
        data: 8,
        label1: 'Purchase Orders',
        label2: 'In progress'
      },
      {
        icon: 'fas fa-truck',
        data: 5,
        label1: 'Goods Requests',
        label2: 'This month'
      },
      {
        icon: 'fas fa-chart-line',
        data: '₹2.5L',
        label1: 'Total Revenue',
        label2: 'This quarter'
      }
    ];
  }

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
