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
            //  localStorage.setItem('VendorId', lifnr);
 
            this.loginSuccess.emit();
            if(this.actor === 'customer'){
              this.customerContextService.setCustomerId(username);
              this.cookieService.set("customerId", username);
            }
            else if(this.actor === 'employee'){
              this.employeeContextService.setEmployeeId(username);
              this.cookieService.set("employeeId", username);
            }
            else if(this.actor === 'vendor'){
              this.vendorContextService.setVendorId(username);
              this.cookieService.set("vendorId", username);
            }
            this.router.navigate([`portal/${this.actor}`]);
          } else {
            this.errorMessage = res.message || 'Invalid credentials';
            // this.loginSuccess.emit();
            // this.router.navigate([`portal/${this.actor}`]);
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
