import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustOverallSalesService {
  private apiUrl = 'http://localhost:3001/api/overall-sales'; // Update if needed

  constructor(private http: HttpClient) {}

  getOverallSalesByCustomerId(kunnr: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${kunnr}`);
  }
}
