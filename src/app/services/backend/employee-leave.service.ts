import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeLeaveDataType } from '../../components/portal/shared/types/employee-leave-data.type';

@Injectable({
  providedIn: 'root',
})
export class EmployeeLeaveService {
  private apiUrl = 'http://localhost:3002/api/employee-leave';

  constructor(private http: HttpClient) {}

  getEmployeeLeaves(employeeId: string): Observable<{ leaves: EmployeeLeaveDataType[] }> {
    const payload = { employeeId: employeeId };
    return this.http.post<{ leaves: EmployeeLeaveDataType[] }>(this.apiUrl, payload);
  }
}
