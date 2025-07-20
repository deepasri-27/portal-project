import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustDeliveryService {
  private apiUrl = 'http://localhost:3000/api/delivery'; // Update if needed

  constructor(private http: HttpClient) {}

  getDeliveriesByCustomerId(kunnr: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${kunnr}`);
  }
}
