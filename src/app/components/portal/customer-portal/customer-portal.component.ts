import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../shared/login/login.component';
import { TopNavComponent } from '../shared/top-nav/top-nav.component';
import { TileData } from '../shared/types/tile-data.types';

@Component({
  selector: 'app-customer-portal',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, TopNavComponent],
  templateUrl: './customer-portal.component.html',
})
export class CustomerPortalComponent {
  isCustomerLoggedIn: boolean;

  profileUrl: string = '/portal/customer/profile';

  tileData: Array<TileData> = [
    { label: 'Dashboard', url: '/portal/customer/dashboard' },
    { label: 'Financial Sheet', url: '/portal/customer/financial-sheet' }
  ];

  portal: string = 'customer';

  constructor() {
    const cookie = this.getCookie('customer');
    this.isCustomerLoggedIn = cookie === 'true';
  }

  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  setCookie(name: string, value: string, days = 1) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  handleLoginSuccess() {
    this.setCookie('customer', 'true');
    this.isCustomerLoggedIn = true;
  }
}
