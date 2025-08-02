import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TilesComponent } from '../../../shared/tiles/tiles.component';
import { VendorProfileService } from '../../../../../services/backend/vendor-profile.service';
import { VendorContextService } from '../../../../../services/context/vendorContext.context';
import { CumulativeDataTile } from '../../../shared/types/cumulative-data.types';

@Component({
  selector: 'app-vendor-finance-default',
  imports: [CommonModule, TilesComponent],
  templateUrl: './vendor-finance-default.component.html',
  styleUrl: './vendor-finance-default.component.css'
})
export class VendorFinanceDefaultComponent implements OnInit {

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

    // Set default cumulative data for vendor financial
    this.setDefaultCumulativeData();
  }

  private setDefaultCumulativeData() {
    this.cumulativeData = [
      {
        icon: 'fas fa-file-invoice-dollar',
        data: 24,
        label1: 'Total Invoices',
        label2: 'This month'
      },
      {
        icon: 'fas fa-wallet',
        data: '₹1.8L',
        label1: 'Outstanding Amount',
        label2: 'Pending payment'
      },
      {
        icon: 'fas fa-receipt',
        data: 6,
        label1: 'Credit Memos',
        label2: 'This quarter'
      }
    ];
  }

  vendorFinancialTiles = [
    {
      title: 'Invoice',
      description: 'View and manage your invoices.',
      icon: 'fas fa-file-invoice-dollar',
      route: 'portal/vendor/financial-sheet/invoice'
    },
    {
      title: 'Payments and Aging',
      description: 'Track payment history and outstanding dues.',
      icon: 'fas fa-wallet',
      route: 'portal/vendor/financial-sheet/payment-aging'
    },
    {
      title: 'Credit/Debit Memo',
      description: 'Manage credit and debit memos issued.',
      icon: 'fas fa-receipt',
      route: 'portal/vendor/financial-sheet/memo'
    }
  ];
}
