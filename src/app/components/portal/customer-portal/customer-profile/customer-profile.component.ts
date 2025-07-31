import { Component, OnInit } from '@angular/core';
import { CustProfileService } from '../../../../services/backend/cust-profile.service';
import { CustProfileDataType } from '../../shared/types/customer-profile-data.type';
import { CommonModule } from '@angular/common';
import { ProfileData } from '../../shared/types/profile-data.types';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { CustomerContextService } from '../../../../services/context/customerContext.context';

@Component({
  selector: 'app-customer-profile',
  imports: [CommonModule, ProfileComponent],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent {
  rawCustomerProfileData: CustProfileDataType = {
    name1: '',
    street: '',
    city : '',
    postcode: '',
    country: ''
  };
  customerProfile: ProfileData = {
      headerData: {
        headerIcon: '',
        name: '',
        id: '',
        idFieldName: ''
      },
      profileDetails: []
    };

  constructor(
    private custProfileService: CustProfileService,
    private customerContextService : CustomerContextService
  ) {
  }


  ngOnInit(): void {
    const kunnr = this.customerContextService.getCustomerId() || '';
    console.log("customer context service id: ");
    console.log(this.customerContextService.getCustomerId());
    this.custProfileService.getCustomerProfile(kunnr).subscribe({
      next: (response) => {
        this.rawCustomerProfileData = response.data;
        console.log(response.data);
        this.configCustomerProfile();
      },
      error: (err) => {
        console.error('Error fetching customer profile:', err);
      }
    });
  }

  configCustomerProfile(): void {
    this.customerProfile.headerData.headerIcon = 'fas fa-user-tie';
    this.customerProfile.headerData.name = this.rawCustomerProfileData.name1;
    this.customerProfile.headerData.id = this.customerContextService.getCustomerId() || '';
    this.customerProfile.headerData.idFieldName = 'Customer ID';
    this.customerProfile.profileDetails.push({
      iconClass: 'fa-user',
      fieldName: 'Name',
      fieldValue: this.rawCustomerProfileData.name1
    });
    this.customerProfile.profileDetails.push({
      iconClass: 'fa-map-marker-alt',
      fieldName: 'City',
      fieldValue: this.rawCustomerProfileData.city
    });
    this.customerProfile.profileDetails.push({
      iconClass: 'fa-flag',
      fieldName: 'Country',
      fieldValue: this.rawCustomerProfileData.country
    });
    this.customerProfile.profileDetails.push({
      iconClass: 'fa-mail-bulk',
      fieldName: 'Postcode',
      fieldValue: this.rawCustomerProfileData.postcode
    });
    this.customerProfile.profileDetails.push({
      iconClass: 'fa-road',
      fieldName: 'Street',
      fieldValue: this.rawCustomerProfileData.street
    });
    
    this.customerProfile.profileDetails.push({
      iconClass: 'fa-hashtag',
      fieldName: 'Customer ID',
      fieldValue: this.customerContextService.getCustomerId() || ''
    });
    for(let i = 0; i < this.customerProfile.profileDetails.length;i++){
      if(this.customerProfile.profileDetails[i].fieldValue === ''){
        this.customerProfile.profileDetails[i].fieldValue = "No Data";
      }
    }
  }
}



