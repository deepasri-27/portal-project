import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { ProfileData } from '../../shared/types/profile-data.types';
import { VprofileDataType } from '../../shared/types/vendor-profile-data.type';

@Component({
  selector: 'app-employee-profile',
  imports: [CommonModule, ProfileComponent],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
})
export class EmployeeProfileComponent implements OnInit {
    rawEmployeeProfileData: VprofileDataType = {
        vendorId: '',
        name: '',
        city: '',
        country: '',
        postcode: '',
        street: '',
    };
    employeeProfile: ProfileData = {
      headerData: {
        name: '',
        id: '',
        idFieldName : '',
        headerIcon: ''
      },
    profileDetails: []
    };
    /// @tobeDone
    // constructor(private profileService: employeeProfileService) {}
  
    // ngOnInit(): void {
    //   const vendorId = '0000100000'; // You can get this from route params or auth token
    //   this.profileService.getemployeeProfile(vendorId).subscribe({
    //     next: (data:any) => {
    //       this.employeeProfile = data.profile;
        
    //     },
    //     error: (err) => {
    //       console.error('Error fetching vendor profile:', err);
    //     }
    //   });
    // @toBeRemoved
  ngOnInit(): void {
      
  }

  configEmployeeProfile(): void {
    this.employeeProfile.headerData.headerIcon = 'fas fa-id-card';
    this.employeeProfile.headerData.name = this.rawEmployeeProfileData.name;
    this.employeeProfile.headerData.id = this.rawEmployeeProfileData.vendorId;
    this.employeeProfile.headerData.idFieldName = 'Vendor ID';
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-id-card',
      fieldName: 'Vendor Name',
      fieldValue: this.rawEmployeeProfileData.name
    });
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-map-marker-alt',
      fieldName: 'City',
      fieldValue: this.rawEmployeeProfileData.city
    });
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-flag',
      fieldName: 'Country',
      fieldValue: this.rawEmployeeProfileData.country
    });
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-mail-bulk',
      fieldName: 'Postcode',
      fieldValue: this.rawEmployeeProfileData.postcode
    });
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-road',
      fieldName: 'Street Address',
      fieldValue: this.rawEmployeeProfileData.street
    });
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-hashtag',
      fieldName: 'Vendor ID',
      fieldValue: this.rawEmployeeProfileData.vendorId
    });
  }
}
