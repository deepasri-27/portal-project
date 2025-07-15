import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal-bar',
  templateUrl: './portal-bar.component.html',
  styleUrls: ['./portal-bar.component.css']
})
export class PortalBarComponent {
  constructor(private router: Router) {}

  navigateTo(portal: string) {
    this.router.navigate(['/portal', portal]);
  }
}
