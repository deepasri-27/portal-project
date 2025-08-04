import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { TileData } from '../types/tile-data.types';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit, OnDestroy {
  @Input() profileUrl: string = '';
  @Input() tileData: TileData[] = [];
  @Input() portal: string = '';

  showDropdown = false;
  currentTab: string = '';

  private routerSubscription!: Subscription;

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.updateTabFromUrl(this.router.url);

    // Listen to router changes
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateTabFromUrl(event.urlAfterRedirects);
      });
  }

  updateTabFromUrl(url: string): void {
    const match = url.match(/^\/portal\/([^\/]+)\/([^\/]+)/);
    if (match) {
      this.portal = match[1];
      this.currentTab = match[2];
    } else {
      this.currentTab = '';
    }
  }

  getTabFromUrl(url: string): string {
    const match = url.match(/^\/portal\/([^\/]+)\/([^\/]+)/);
    let tab:string;
    if(match){
      tab = match[2];
    }
    else {
      tab = '';
    }
    return tab;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.cookieService.set(this.portal + "Id", "");
    console.log('logout: ' + this.portal);
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
