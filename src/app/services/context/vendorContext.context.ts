import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorContextService {

  constructor(private cookieService: CookieService) {
    this.loadVendorFromCookie(); // Load from cookie on init
  }

  private vendorIdSubject = new BehaviorSubject<string | null>(null);

  // Observable to expose
  vendorId$ = this.vendorIdSubject.asObservable();

  // Set new user name
  setVendorId(name: string) {
    this.vendorIdSubject.next(name);
  }

  getVendorId(): string | null {
    return this.vendorIdSubject.value;
  }

  loadVendorFromCookie(): void {
    const savedVendorId = this.cookieService.get('vendorId');
    if (savedVendorId) {
      this.vendorIdSubject.next(savedVendorId);
    }
  }
}
