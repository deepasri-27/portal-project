import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustMemoService {
  private apiUrl = 'http://localhost:3001/api/memo'; // Update this to your backend route

  constructor(private http: HttpClient) {}

  getMemosByCustomerId(customerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${customerId}`);
  }
}
