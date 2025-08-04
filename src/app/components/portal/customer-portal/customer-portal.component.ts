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
  templateUrl: './customer-portal.component.html'
})
export class CustomerPortalComponent {
  isCustomerLoggedIn: boolean = false;

  profileUrl: string = '/portal/customer/profile';

  tileData: Array<TileData> = [
    { label: 'Dashboard', url: '/portal/customer/dashboard' },
    { label: 'Financial Sheet', url: '/portal/customer/financial-sheet' }
  ];

  portal: string = 'customer';

  constructor(private cookieService: CookieService) {
    this.checkAuthenticationStatus();
  }

  private checkAuthenticationStatus(): void {
    const customerId = this.cookieService.get('customerId');
    console.log("Main: " + this.cookieService.get('customerId'));
    this.isCustomerLoggedIn = !!customerId;
    console.log("Main: " + this.isCustomerLoggedIn);
  }

  handleLoginSuccess() {
    this.isCustomerLoggedIn = true;
  }
}
