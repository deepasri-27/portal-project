import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendorPaymentAgingService {
  private apiUrl = 'http://localhost:3000/api/aging'; // Update this if your backend URL differs

  constructor(private http: HttpClient) {}

  getAgingByVendorId(vendorId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${vendorId}`);
  }
}
