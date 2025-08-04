import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-portal-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portal-bar.component.html',
  styleUrls: ['./portal-bar.component.css']
})
export class PortalBarComponent implements OnInit, OnDestroy {
  currentPortal: string = '';
  private routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updatePortalFromUrl(this.router.url);

    // Subscribe to route changes
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updatePortalFromUrl(event.urlAfterRedirects);
      });
  }

  updatePortalFromUrl(url: string): void {
    const match = url.match(/portal\/(\w+)/);
    this.currentPortal = match ? match[1] : '';
  }

  navigateTo(portal: string): void {
    this.router.navigate([`portal/${portal}`]);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
