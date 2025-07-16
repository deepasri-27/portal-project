import { Component } from '@angular/core';
import { LoginComponent } from '../shared/login/login.component'; // adjust path if needed

@Component({
  selector: 'app-employee-portal',
  standalone: true,
  imports: [LoginComponent],
  templateUrl:'employee-portal.component.html'
})
export class EmployeePortalComponent {}
