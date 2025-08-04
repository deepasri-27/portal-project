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
        return 'assets/images/customer.svg';
      case 'vendor':
        return 'assets/images/vendor.svg';
      case 'employee':
        return 'assets/images/employee.svg';
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
