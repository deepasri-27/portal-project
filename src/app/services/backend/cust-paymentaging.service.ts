import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustPaymentAgingService {
  private apiUrl = 'http://localhost:3001/api/aging'; // Update if backend port or route differs

  constructor(private http: HttpClient) {}

  getAgingByCustomerId(kunnr: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${kunnr}`);
  }
}
