import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../shared/login/login.component';
import { TopNavComponent } from '../shared/top-nav/top-nav.component';
import { TileData } from '../shared/types/tile-data.types';
import { CookieService } from 'ngx-cookie-service';

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
    { label: 'Dashboard', url: '/portal/employee/dashboard' },
  ];

  portal: string = 'employee';

  constructor(private cookieService: CookieService) {
    this.isEmployeeLoggedIn = !(!(this.cookieService.get('employeeId')));
  }

  handleLoginSuccess() {
    this.isEmployeeLoggedIn = true;
  }
}
