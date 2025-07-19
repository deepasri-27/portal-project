import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendorGoodsService {
  private apiUrl = 'http://localhost:3000/api/goods'; // Update backend URL if needed

  constructor(private http: HttpClient) {}

  getGoodsByVendorId(vendorId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${vendorId}`);
  }
}
