import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeProfileDataType } from '../../components/portal/shared/types/employee-profile-data.type';

@Injectable({
  providedIn: 'root',
})
export class EmployeeProfileService {
  private apiUrl = 'http://localhost:3002/api/employee-profile'; // Replace with actual base URL if different

  constructor(private http: HttpClient) {}

  getEmployeeProfile(employeeId: string): Observable<EmployeeProfileDataType> {
    const payload = { employeeId: employeeId };
    return this.http.post<EmployeeProfileDataType>(this.apiUrl, payload);
  }
}
