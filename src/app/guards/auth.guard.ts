import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CustomerContextService } from '../services/context/customerContext.context';
import { EmployeeContextService } from '../services/context/employeeContext.context';
import { VendorContextService } from '../services/context/vendorContext.context';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private customerContext: CustomerContextService,
    private employeeContext: EmployeeContextService,
    private vendorContext: VendorContextService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url = state.url;
    
    // Determine portal type from URL
    if (url.includes('/portal/customer')) {
      return this.checkCustomerAuth();
    } else if (url.includes('/portal/employee')) {
      return this.checkEmployeeAuth();
    } else if (url.includes('/portal/vendor')) {
      return this.checkVendorAuth();
    }
    
    // If not a protected route, allow access
    return true;
  }

  private checkCustomerAuth(): boolean {
    const customerId = this.cookieService.get('customerId');
    if (customerId) {
      // Ensure context service is synchronized
      this.customerContext.setCustomerId(customerId);
      return true;
    }
    
    // Only redirect if not already on the login page
    const currentUrl = this.router.url;
    if (currentUrl !== '/portal/customer') {
      this.router.navigate(['/portal/customer']);
    }
    return false;
  }

  private checkEmployeeAuth(): boolean {
    const employeeId = this.cookieService.get('employeeId');
    if (employeeId) {
      // Ensure context service is synchronized
      this.employeeContext.setEmployeeId(employeeId);
      return true;
    }
    
    // Only redirect if not already on the login page
    const currentUrl = this.router.url;
    if (currentUrl !== '/portal/employee') {
      this.router.navigate(['/portal/employee']);
    }
    return false;
  }

  private checkVendorAuth(): boolean {
    const vendorId = this.cookieService.get('vendorId');
    if (vendorId) {
      // Ensure context service is synchronized
      this.vendorContext.setVendorId(vendorId);
      return true;
    }
    
    // Only redirect if not already on the login page
    const currentUrl = this.router.url;
    if (currentUrl !== '/portal/vendor') {
      this.router.navigate(['/portal/vendor']);
    }
    return false;
  }
}
