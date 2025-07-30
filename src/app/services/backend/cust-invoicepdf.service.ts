import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustInvoicePdfService {
  private apiUrl = 'http://localhost:3001/api/invoice-pdf'; // Backend URL for customer PDF

  constructor(private http: HttpClient) {}

  // ✅ Method to download customer invoice PDF
  downloadInvoicePdf(invoiceId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${invoiceId}`, {
      responseType: 'blob'
    });
  }
}
