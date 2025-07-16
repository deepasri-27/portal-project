import { Component } from '@angular/core';
import { LoginComponent } from '../shared/login/login.component'; // path depends on structure

@Component({
  selector: 'app-customer-portal',
  standalone: true,
  imports: [LoginComponent],
  template: `
    <app-login
      [actor]="'customer'"
      [heading]="'Customer Login'"
      [placeholder]="'Customer ID'">
    </app-login>
  `
})
export class CustomerPortalComponent {}
