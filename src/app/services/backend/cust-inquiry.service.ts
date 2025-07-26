import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustInquiryService {
  private apiUrl = 'http://localhost:3001/api/inquiry'; // Adjust as needed

  constructor(private http: HttpClient) {}

  getInquiriesByCustomerId(kunnr: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${kunnr}`);
  }
}
