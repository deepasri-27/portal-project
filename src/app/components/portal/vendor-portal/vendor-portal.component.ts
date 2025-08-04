import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../shared/login/login.component';
import { TopNavComponent } from '../shared/top-nav/top-nav.component';
import { TileData } from '../shared/types/tile-data.types';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-vendor-portal',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, TopNavComponent],
  templateUrl: 'vendor-portal.component.html'
})
export class VendorPortalComponent {
  isVendorLoggedIn = false;

  profileUrl: string = 'portal/vendor/profile';

  tileData: Array<TileData> = [
    { label: 'Dashboard', url: '/portal/vendor/dashboard' },
    { label: 'Financial Sheet', url: '/portal/vendor/financial-sheet' }
  ];

  portal: string = 'vendor';

  constructor(private cookieService: CookieService) {
    this.checkAuthenticationStatus();
  }

  private checkAuthenticationStatus(): void {
    const vendorId = this.cookieService.get('vendorId');
    this.isVendorLoggedIn = !!vendorId;
  }

  handleLoginSuccess() {
    this.isVendorLoggedIn = true;
  }
}
