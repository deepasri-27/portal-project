import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VprofileDataType } from '../../components/portal/shared/types/vendor-profile-data.type';


@Injectable({
  providedIn: 'root',
})
export class VendorProfileService {
  private apiUrl = 'http://localhost:3000/api/vendor-profile'; // Replace with actual API

  constructor(private http: HttpClient) {}

  getVendorProfile(vendorId: string): Observable<VprofileDataType> {
    return this.http.get<VprofileDataType>(`${this.apiUrl}/${vendorId}`);
  }
}
