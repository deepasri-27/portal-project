import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../shared/login/login.component';
import { TopNavComponent } from '../shared/top-nav/top-nav.component';
import { TileData } from '../shared/types/tile-data.types';


@Component({
  selector: 'app-vendor-portal',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, TopNavComponent],
  templateUrl: 'vendor-portal.component.html'
})
export class VendorPortalComponent {
  isVendorLoggedIn: boolean;

  profileUrl: string = 'portal/vendor/profile';

  tileData: Array<TileData> = [
    { label: 'Dashboard', url: '/portal/vendor/dashboard' },
    { label: 'Financial Sheet', url: '/portal/vendor/financial-sheet' }
  ];
   portal:string='vendor';

  constructor() {
    const cookie = this.getCookie('vendor');
    this.isVendorLoggedIn = cookie === 'true';
  }

  // ✅ Read cookie
  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  // ✅ Write cookie (optional helper)
  setCookie(name: string, value: string, days = 1) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  // ✅ Handle login success (called from <app-login>)
  handleLoginSuccess() {
    this.setCookie('vendor', 'true');
    this.isVendorLoggedIn = true;
  }
}
