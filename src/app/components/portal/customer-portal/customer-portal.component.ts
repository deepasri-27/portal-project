import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../shared/login/login.component';
import { TopNavComponent } from '../shared/top-nav/top-nav.component';
import { TileData } from '../shared/types/tile-data.types';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-customer-portal',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, TopNavComponent],
  templateUrl: './customer-portal.component.html',
  providers: [CookieService] // Required if using standalone component
})
export class CustomerPortalComponent {
  isCustomerLoggedIn: boolean;

  profileUrl: string = '/portal/customer/profile';

  tileData: Array<TileData> = [
    { label: 'Dashboard', url: '/portal/customer/dashboard' },
    { label: 'Financial Sheet', url: '/portal/customer/financial-sheet' }
  ];

  portal: string = 'customer';

  constructor(private cookieService: CookieService) {
    this.isCustomerLoggedIn = this.cookieService.get('customer') === 'true';
  }

  handleLoginSuccess() {
    this.cookieService.set('customer', 'true', 1); // 1 = expires in 1 day
    this.isCustomerLoggedIn = true;
  }
}
