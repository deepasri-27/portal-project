import { Component } from '@angular/core';
import { LoginComponent } from '../shared/login/login.component'; // adjust path if needed

@Component({
  selector: 'app-vendor-portal',
  standalone: true,
  imports: [LoginComponent],
  template: `
    <app-login
      [actor]="'vendor'"
      [heading]="'Vendor Login'"
      [placeholder]="'Vendor ID'">
    </app-login>
  `
})
export class VendorPortalComponent {

}
