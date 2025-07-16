import { Component } from '@angular/core';
import { LoginComponent } from '../shared/login/login.component'; // path depends on structure
import { TopNavComponent } from '../shared/top-nav/top-nav.component';
@Component({
  selector: 'app-customer-portal',
  standalone: true,
  imports: [LoginComponent,TopNavComponent],
  templateUrl:'customer-portal.component.html'
})
export class CustomerPortalComponent {}
