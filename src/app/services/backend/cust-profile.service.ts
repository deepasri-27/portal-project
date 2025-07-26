import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustProfileDataType } from '../../components/portal/shared/types/customer-profile-data.type';

@Injectable({
  providedIn: 'root',
})
export class CustProfileService {
  private apiUrl = 'http://localhost:3001/api/profile'; // Replace with actual base URL if different

  constructor(private http: HttpClient) {}

  getCustomerProfile(kunnr: string): Observable<{ success: boolean; data: CustProfileDataType }> {
    return this.http.get<{ success: boolean; data: CustProfileDataType }>(
      `${this.apiUrl}/${kunnr}`
    );
  }
}
