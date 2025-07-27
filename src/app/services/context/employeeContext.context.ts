import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeContextService {

  constructor(private cookieService: CookieService) {
    this.loadEmployeeFromCookie(); // Load from cookie on init
  }

  private employeeIdSubject = new BehaviorSubject<string | null>(null);

  // Observable to expose
  employeeId$ = this.employeeIdSubject.asObservable();

  // Set new user name
  setEmployeeId(name: string) {
    this.employeeIdSubject.next(name);
  }

  getEmployeeId(): string | null {
    return this.employeeIdSubject.value;
  }

  loadEmployeeFromCookie(): void {
    const savedEmployeeId = this.cookieService.get('employeeId');
    if (savedEmployeeId) {
      this.employeeIdSubject.next(savedEmployeeId);
    }
  }
}
