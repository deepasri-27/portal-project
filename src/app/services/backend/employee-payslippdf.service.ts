import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeePayslipPdfService {
  private apiUrl = 'http://localhost:3002/api/employee-paypdf'; // Change port if needed

  constructor(private http: HttpClient) {}

  downloadPayslipPdf(employeeId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${employeeId}`, {
      responseType: 'json'
    });
  }
}
