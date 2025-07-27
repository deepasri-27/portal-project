import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerContextService {

  constructor(private cookieService: CookieService) {
    this.loadCustomerFromCookie(); // Load from cookie on init
  }

  private customerIdSubject = new BehaviorSubject<string | null>(null);

  // Observable to expose
  customerId$ = this.customerIdSubject.asObservable();

  // Set new user name
  setCustomerId(name: string) {
    this.customerIdSubject.next(name);
  }

  getCustomerId(): string | null {
    return this.customerIdSubject.value;
  }

  loadCustomerFromCookie(): void {
    const savedCustomerId = this.cookieService.get('customerId');
    if (savedCustomerId) {
      this.customerIdSubject.next(savedCustomerId);
    }
  }
}
