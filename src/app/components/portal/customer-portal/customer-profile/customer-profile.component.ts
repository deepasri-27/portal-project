import { Component, OnInit } from '@angular/core';
import { CustProfileService } from '../../../../services/backend/cust-profile.service';
import { CustProfileDataType } from '../../shared/types/customer-profile-data.type';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-customer-profile',
  imports: [CommonModule],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent {
customerProfile: CustProfileDataType | null = null;

  constructor(private custProfileService: CustProfileService) {}

  ngOnInit(): void {
    const kunnr = '0000000001'; // You can fetch this dynamically from route or login token
    this.custProfileService.getCustomerProfile(kunnr).subscribe({
      next: (response) => {
        this.customerProfile = response.data;
      },
      error: (err) => {
        console.error('Error fetching customer profile:', err);
      }
    });
  }
}



