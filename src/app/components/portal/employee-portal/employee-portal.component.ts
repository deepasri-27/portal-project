import { Component } from '@angular/core';
import { LoginComponent } from '../shared/login/login.component'; // adjust path if needed

@Component({
  selector: 'app-employee-portal',
  standalone: true,
  imports: [LoginComponent],
  template: `
    <app-login
      [actor]="'employee'"
      [heading]="'Employee Login'"
      [placeholder]="'Employee ID'">
    </app-login>
  `
})
export class EmployeePortalComponent {}
