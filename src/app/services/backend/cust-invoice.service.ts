import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustInvoiceService {
  private apiUrl = 'http://localhost:3001/api/invoices'; // Adjust as needed

  constructor(private http: HttpClient) {}

  getInvoicesByCustomerId(kunnr: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${kunnr}`);
  }
}
