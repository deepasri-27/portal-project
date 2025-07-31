import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeePayslipDataType } from '../../components/portal/shared/types/employee-payslip-data.type';

@Injectable({
  providedIn: 'root',
})
export class EmployeePayslipService {
  private apiUrl = 'http://localhost:3002/api/employee-pay';

  constructor(private http: HttpClient) {}

  getEmployeePayslips(employeeId: string): Observable<{ payslip: EmployeePayslipDataType[] }> {
    const payload = { employeeId: employeeId };
    return this.http.post<{ payslip: EmployeePayslipDataType[] }>(this.apiUrl, payload);
  }
}
