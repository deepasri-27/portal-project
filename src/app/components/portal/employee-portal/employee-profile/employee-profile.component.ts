import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { ProfileData } from '../../shared/types/profile-data.types';
import { EmployeeProfileDataType } from '../../shared/types/employee-profile-data.type';
import { EmployeeProfileService } from '../../../../services/backend/employee-profile.service';
import { EmployeeContextService } from '../../../../services/context/employeeContext.context';

@Component({
  selector: 'app-employee-profile',
  imports: [CommonModule, ProfileComponent],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
})
export class EmployeeProfileComponent implements OnInit {
    rawEmployeeProfileData: EmployeeProfileDataType = {
        fullName: '',
        gender: '',
        dob: '',
        orgUnit: '',
        position: '',
        department: '',
        compCode: '',
        email: '',
        phone: '',
        address: '',
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

    constructor(
      private profileService: EmployeeProfileService,
      private employeeContext: EmployeeContextService
    ) {}
  
    ngOnInit(): void {
      const employeeId = this.employeeContext.getEmployeeId();
      if (employeeId) {
        this.profileService.getEmployeeProfile(employeeId).subscribe({
          next: (profileData) => {
            this.rawEmployeeProfileData = profileData;
            this.configEmployeeProfile();
          },
          error: (err) => {
            console.error('Error fetching employee profile:', err);
          }
        });
      }
  }

  configEmployeeProfile(): void {
    this.employeeProfile.headerData.headerIcon = 'fas fa-id-card';
    this.employeeProfile.headerData.name = this.rawEmployeeProfileData.fullName;
    this.employeeProfile.headerData.id = this.employeeContext.getEmployeeId() || '';
    this.employeeProfile.headerData.idFieldName = 'Employee ID';
    
    // Clear existing details
    this.employeeProfile.profileDetails = [];
    
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-user',
      fieldName: 'Full Name',
      fieldValue: this.rawEmployeeProfileData.fullName
    });
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-venus-mars',
      fieldName: 'Gender',
      fieldValue: this.rawEmployeeProfileData.gender
    });
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-calendar',
      fieldName: 'Date of Birth',
      fieldValue: this.rawEmployeeProfileData.dob
    });
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-building',
      fieldName: 'Organization Unit',
      fieldValue: this.rawEmployeeProfileData.orgUnit
    });
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-briefcase',
      fieldName: 'Position',
      fieldValue: this.rawEmployeeProfileData.position
    });
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-users',
      fieldName: 'Department',
      fieldValue: this.rawEmployeeProfileData.department
    });
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-building',
      fieldName: 'Company Code',
      fieldValue: this.rawEmployeeProfileData.compCode
    });
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-envelope',
      fieldName: 'Email',
      fieldValue: this.rawEmployeeProfileData.email
    });
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-phone',
      fieldName: 'Phone',
      fieldValue: this.rawEmployeeProfileData.phone
    });
    this.employeeProfile.profileDetails.push({
      iconClass: 'fa-map-marker-alt',
      fieldName: 'Address',
      fieldValue: this.rawEmployeeProfileData.address
    });
  }
}
