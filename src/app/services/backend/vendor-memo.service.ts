import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendorMemoService {
  private apiUrl = 'http://localhost:3000/api/memo'; // Update backend URL if needed

  constructor(private http: HttpClient) {}

  getMemosByVendorId(vendorId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${vendorId}`);
  }
}
