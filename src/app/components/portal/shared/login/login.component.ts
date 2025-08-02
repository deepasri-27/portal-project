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
  showPassword: boolean = false;

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
        return 'Deliver exceptional customer experiences with integrated services';
      case 'vendor':
        return 'Streamline vendor relationships and procurement processes';
      case 'employee':
        return 'Manage your workforce efficiently with comprehensive employee services';
      default:
        return 'Welcome to the integrated portal. Please sign in to continue.';
    }
  }

  getPortalIcon(): string {
    switch (this.actor.toLowerCase()) {
      case 'customer':
        return `<svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
          <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" opacity="0.7"/>
        </svg>`;
      case 'vendor':
        return `<svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2ZM12 4.3L20 8.2V10C20 15.5 16.4 19.9 12 20.9C7.6 19.9 4 15.5 4 10V8.2L12 4.3Z"/>
          <path d="M8 11L11 14L16 9L14.59 7.58L11 11.17L9.41 9.59L8 11Z"/>
        </svg>`;
      case 'employee':
        return `<svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" opacity="0.7"/>
        </svg>`;
      default:
        return `<svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H20V19ZM20 15H12V13H20V15ZM20 11H12V9H20V11Z"/>
        </svg>`;
    }
  }

  getPortalIconClass(): string {
    switch (this.actor.toLowerCase()) {
      case 'customer':
        return 'customer-icon';
      case 'vendor':
        return 'vendor-icon';
      case 'employee':
        return 'employee-icon';
      default:
        return 'default-icon';
    }
  }

  getPortalFeatures(): string[] {
    switch (this.actor.toLowerCase()) {
      case 'customer':
        return [
          'Order Management',
          'Financial Statements',
          'Support & Inquiries',
          'Delivery Tracking'
        ];
      case 'vendor':
        return [
          'Purchase Order Management',
          'Invoice Processing',
          'Payment Tracking',
          'Vendor Performance'
        ];
      case 'employee':
        return [
          'Payroll & Benefits Management',
          'Leave Request System',
          'Performance Tracking',
          'Employee Profiles'
        ];
      default:
        return ['Portal Access', 'Secure Login', 'User Management'];
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    this.errorMessage = '';

    const username = this.loginForm.value.id;
    const password = this.loginForm.value.password;

    if (!username || !password) {
      this.errorMessage = `Please enter ${this.placeholder} and Password`;
      return;
    }

    let payload: any;
    let port: string = '';
    
    if (this.actor === 'vendor') {
      port = '3000';
      payload = {
        username: username,
        password: password.trim(),
      };
    } else if (this.actor === 'customer') {
      port = '3001';
      payload = {
        username: username,
        password: password.trim(),
      };
    } else if (this.actor === 'employee') {
      port = '3002';
      payload = {
        employeeId: username,  // Backend expects employeeId, not username
        password: password.trim(),
      };
    }
    this.http
      .post<any>(`http://localhost:${port}/api/${this.actor}-login`, payload)
      .subscribe({
        next: (res) => {
          if (res.status === 'success'||res.status===true ||res.status=='Login Successful') {

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
              // Use employeeId from response instead of username
              const employeeId = res.employeeId || username;
              this.employeeContextService.setEmployeeId(employeeId);
              this.cookieService.set("employeeId", employeeId, {
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
          //   this.loginSuccess.emit();
          //  this.router.navigate([`portal/${this.actor}`]);
        },
      });
  }
}
