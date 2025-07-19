import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendorRfqService {
  private apiUrl = 'http://localhost:3000/api/rfq'; // Change if your backend runs elsewhere

  constructor(private http: HttpClient) {}

  getRfqByVendorId(vendorId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${vendorId}`);
  }
}
