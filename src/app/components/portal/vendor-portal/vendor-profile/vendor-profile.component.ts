import { Component, OnInit } from '@angular/core';
import { VendorProfileService } from '../../../../services/backend/vendor-profile.service';
import { VprofileDataType } from '../../shared/types/vendor-profile-data.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendor-profile',
  imports:[CommonModule],
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.css']
})
export class VendorProfileComponent implements OnInit {
  vendorProfile: VprofileDataType | null = null;

  constructor(private profileService: VendorProfileService) {}

  ngOnInit(): void {
    const vendorId = '0000100000'; // You can get this from route params or auth token
    this.profileService.getVendorProfile(vendorId).subscribe({
      next: (data:any) => {
        this.vendorProfile = data.profile;
      
      },
      error: (err) => {
        console.error('Error fetching vendor profile:', err);
      }
    });
  }
}
