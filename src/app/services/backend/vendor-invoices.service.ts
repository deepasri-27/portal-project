import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendorInvoiceService {
  private apiUrl = 'http://localhost:3000/api/invoices'; // Update backend URL if needed

  constructor(private http: HttpClient) {}

  getInvoicesByVendorId(vendorId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${vendorId}`);
  }
}
