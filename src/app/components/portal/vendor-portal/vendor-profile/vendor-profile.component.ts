import { Component, OnInit } from '@angular/core';
import { VendorProfileService } from '../../../../services/backend/vendor-profile.service';
import { VprofileDataType } from '../../shared/types/vendor-profile-data.type';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { ProfileData } from '../../shared/types/profile-data.types';
import { VendorContextService } from '../../../../services/context/vendorContext.context';

@Component({
  selector: 'app-vendor-profile',
  imports:[CommonModule, ProfileComponent],
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.css']
})
export class VendorProfileComponent implements OnInit {
  rawVendorProfileData: VprofileDataType = {
    vendorId: '',
    name: '',
    city: '',
    country: '',
    postcode: '',
    street: ''
  };
  vendorProfile: ProfileData = {
    headerData: {
      headerIcon: '',
      name: "",
      id: '',
      idFieldName: ''
    },
    profileDetails: []
  };

  constructor(
    private profileService: VendorProfileService,
    private vendorContextService: VendorContextService
  ) {}

  ngOnInit(): void {
    const vendorId = this.vendorContextService.getVendorId() || '';
    this.profileService.getVendorProfile(vendorId).subscribe({
      next: (data:any) => {
        this.rawVendorProfileData = data.profile;
        this.configVendorProfile();
      },
      error: (err) => {
        console.error('Error fetching vendor profile:', err);
      }
    });
  }

  configVendorProfile(): void {
    this.vendorProfile.headerData.headerIcon = 'fas fa-id-card';
    this.vendorProfile.headerData.name = this.rawVendorProfileData.name;
    this.vendorProfile.headerData.id = this.rawVendorProfileData.vendorId;
    this.vendorProfile.headerData.idFieldName = 'Vendor ID';
    this.vendorProfile.profileDetails.push({
      iconClass: 'fa-id-card',
      fieldName: 'Vendor Name',
      fieldValue: this.rawVendorProfileData.name
    });
    this.vendorProfile.profileDetails.push({
      iconClass: 'fa-map-marker-alt',
      fieldName: 'City',
      fieldValue: this.rawVendorProfileData.city
    });
    this.vendorProfile.profileDetails.push({
      iconClass: 'fa-flag',
      fieldName: 'Country',
      fieldValue: this.rawVendorProfileData.country
    });
    this.vendorProfile.profileDetails.push({
      iconClass: 'fa-mail-bulk',
      fieldName: 'Postcode',
      fieldValue: this.rawVendorProfileData.postcode
    });
    this.vendorProfile.profileDetails.push({
      iconClass: 'fa-road',
      fieldName: 'Street Address',
      fieldValue: this.rawVendorProfileData.street
    });
    this.vendorProfile.profileDetails.push({
      iconClass: 'fa-hashtag',
      fieldName: 'Vendor ID',
      fieldValue: this.rawVendorProfileData.vendorId
    });
    for(let i = 0; i < this.vendorProfile.profileDetails.length;i++){
      if(this.vendorProfile.profileDetails[i].fieldValue === ''){
        this.vendorProfile.profileDetails[i].fieldValue = "No Data";
      }
    }
  }
}
