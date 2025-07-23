import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() actor: string = '';
  @Input() heading: string = '';
  @Input() placeholder: string = '';
  @Output() loginSuccess = new EventEmitter<void>();

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      id: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onLogin() {
    this.errorMessage = '';

    const lifnr = this.loginForm.value.id;
    const password = this.loginForm.value.password;

    if (!lifnr || !password) {
      this.errorMessage = `Please enter ${this.placeholder} and Password`;
      return;
    }

    const payload = {
      lifnr: lifnr,
      password: password.trim()
    };

    this.http.post<any>(`http://localhost:3000/api/${this.actor}-login`, payload).subscribe({
      next: (res) => {
        if (res.status === 'success') {
           localStorage.setItem('VendorId', lifnr);
          
          this.loginSuccess.emit(); // Notify parent on success
          this.router.navigate([`portal/${this.actor}`]);
        } else {
          this.errorMessage = res.message || 'Invalid credentials';
          this.loginSuccess.emit(); 
          this.router.navigate([`portal/${this.actor}`]);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Server error during login';
         this.loginSuccess.emit(); 
         this.router.navigate([`portal/${this.actor}`]);
      }
    });
  }
}

