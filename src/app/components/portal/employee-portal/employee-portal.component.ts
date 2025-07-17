import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../shared/login/login.component';
import { TopNavComponent } from '../shared/top-nav/top-nav.component';
import { TileData } from '../shared/types/tile-data.types';

@Component({
  selector: 'app-employee-portal',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, TopNavComponent],
  templateUrl: './employee-portal.component.html',
})
export class EmployeePortalComponent {
  isEmployeeLoggedIn: boolean;

  profileUrl: string = '/portal/employee/profile';

  tileData: Array<TileData> = [
    { label: 'Leave Request', url: '/portal/employee/leave-request' },
    { label: 'Payslip', url: '/portal/employee/payslip' }
  ];

  portal: string = 'employee';

  constructor() {
    const cookie = this.getCookie('employee');
    this.isEmployeeLoggedIn = cookie === 'true';
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
    this.setCookie('employee', 'true');
    this.isEmployeeLoggedIn = true;
  }
}
