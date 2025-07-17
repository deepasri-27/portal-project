import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-profile',
  imports: [],
  templateUrl: './vendor-profile.component.html',
  styleUrl: './vendor-profile.component.css'
})
export class VendorProfileComponent implements OnInit {

  profile = {
    VendorId: '100000',
    Name: 'Vendor for Kaar',
    City: 'Chennai',
    Country: 'IN',
    Postcode: '524305',
    Street: 'A-1234 Shivalayam street'
  };

  constructor() { }

  ngOnInit(): void {}
}