import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CustomerContextService } from '../../../../services/context/customerContext.context';
import { EmployeeContextService } from '../../../../services/context/employeeContext.context';
import { VendorContextService } from '../../../../services/context/vendorContext.context';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() actor: string = '';
  @Input() heading: string = '';
  @Input() placeholder: string = '';
  @Output() loginSuccess = new EventEmitter<void>();

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private customerContextService: CustomerContextService,
    private employeeContextService: EmployeeContextService,
    private vendorContextService: VendorContextService,
    private cookieService : CookieService
  ) {
    this.loginForm = this.fb.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getPortalImage(): string {
    switch (this.actor.toLowerCase()) {
      case 'customer':
        return 'assets/images/customer-portal.svg';
      case 'vendor':
        return 'assets/images/vendor-portal.svg';
      case 'employee':
        return 'assets/images/employee-portal.svg';
      default:
        return 'assets/images/kaar-logo.png';
    }
  }

  getPortalTitle(): string {
    switch (this.actor.toLowerCase()) {
      case 'customer':
        return 'Customer Portal';
      case 'vendor':
        return 'Vendor Portal';
      case 'employee':
        return 'Employee Portal';
      default:
        return 'Portal Access';
    }
  }

  getPortalDescription(): string {
    switch (this.actor.toLowerCase()) {
      case 'customer':
        return 'Access your orders, invoices, and customer services with ease. Manage your account and track your business activities.';
      case 'vendor':
        return 'Manage your vendor account, view purchase orders, and track payments. Streamline your business operations.';
      case 'employee':
        return 'Access your employee dashboard, manage leave requests, and view payslips. Stay connected with your workplace.';
      default:
        return 'Welcome to the integrated portal. Please sign in to continue.';
    }
  }
  onLogin() {
    this.errorMessage = '';

    const username = this.loginForm.value.id;
    const password = this.loginForm.value.password;

    if (!username || !password) {
      this.errorMessage = `Please enter ${this.placeholder} and Password`;
      return;
    }

    const payload = {
      username: username,
      password: password.trim(),
    };

    let port: string='';
    if (this.actor === 'vendor') {
      port = '3000';
    } else if (this.actor === 'customer') {
      port = '3001';
    } else if (this.actor === 'employee') {
      port = '3002';
    }
    this.http
      .post<any>(`http://localhost:${port}/api/${this.actor}-login`, payload)
      .subscribe({
        next: (res) => {
          if (res.status === 'success'||res.status===true) {

            this.loginSuccess.emit();
            const hundredYearsFromNow = new Date();
            hundredYearsFromNow.setFullYear(hundredYearsFromNow.getFullYear() + 100);

            if(this.actor === 'customer'){
              this.customerContextService.setCustomerId(username);
              this.cookieService.set("customerId", username, {
                expires: hundredYearsFromNow,
                path: '/',
              });
            }
            else if(this.actor === 'employee'){
              this.employeeContextService.setEmployeeId(username);
              this.cookieService.set("employeeId", username, {
                expires: hundredYearsFromNow,
                path: '/',
              });
            }
            else if(this.actor === 'vendor'){
              this.vendorContextService.setVendorId(username);
              this.cookieService.set("vendorId", username, {
                expires: hundredYearsFromNow,
                path: '/',
              });
            }
            this.router.navigate([`portal/${this.actor}`]);
          } else {
            this.errorMessage = res.message || 'Invalid credentials';
          }
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Server error during login';
          //  this.loginSuccess.emit();
          //  this.router.navigate([`portal/${this.actor}`]);
        },
      });
  }
}
