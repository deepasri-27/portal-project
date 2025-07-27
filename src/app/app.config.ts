import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { CustomerContextService } from './services/context/customerContext.context';
import { VendorContextService } from './services/context/vendorContext.context';
import { EmployeeContextService } from './services/context/employeeContext.context';
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // ✅ keep only one
 // optional if you're using provideHttpClient()
    provideHttpClient(), // ✅ Required for standalone HttpClient usage
    CustomerContextService,
    VendorContextService,
    EmployeeContextService,
    CookieService
  ]
};
