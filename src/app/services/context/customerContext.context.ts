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
    console.log("1:" + this.customerIdSubject.value);
    const savedCustomerId = this.cookieService.get('customerId');
    if (savedCustomerId) {
      console.log("2:" + this.customerIdSubject.value);
      this.customerIdSubject.next(savedCustomerId);
      console.log("3:" + this.customerIdSubject.value);
    }
    console.log("4:" + this.customerIdSubject.value);
  }
}
