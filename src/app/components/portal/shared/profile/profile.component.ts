import { Component, Input } from '@angular/core';
import { ProfileData } from '../types/profile-data.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Input() profileData: ProfileData = {
    headerData: {
      name: 'No Data',
      id: 'No Data',
      idFieldName: 'No Data',
      headerIcon: 'No Data'
    },
    profileDetails: []
  };
}
