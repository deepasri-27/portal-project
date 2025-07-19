import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendorPoService {
  private apiUrl = 'http://localhost:3000/api/purchase'; // Update if using a different backend

  constructor(private http: HttpClient) {}

  getPoByVendorId(vendorId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${vendorId}`);
  }
}
