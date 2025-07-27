import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustSalesService {
  private apiUrl = 'http://localhost:3001/api/sales'; // Adjust this as per your backend route

  constructor(private http: HttpClient) {}

  getSalesByCustomerId(kunnr: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${kunnr}`);
  }
}
