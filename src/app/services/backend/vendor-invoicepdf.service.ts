import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendorInvoicePdfService {
  private apiUrl = 'http://localhost:3000/api/invoice-pdf'; // Your base backend URL

  constructor(private http: HttpClient) {}


  // ✅ New method to get the invoice PDF
  downloadInvoicePdf(invoiceId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${invoiceId}`, {
      responseType: 'json'
    });
  }
}
