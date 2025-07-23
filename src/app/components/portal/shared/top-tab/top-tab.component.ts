import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TileData } from '../types/tile-data.types';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-top-tab',
  standalone: true,
  imports: [RouterLink, NgForOf, CommonModule],
  templateUrl: './top-tab.component.html',
  styleUrl: './top-tab.component.css'
})
export class TopTabComponent implements OnInit, OnDestroy {
  @Input() tabs: TileData[] = [];

  currentInnerTab: string = '';
  private routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setInnerTabFromUrl(this.router.url);

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.setInnerTabFromUrl(event.urlAfterRedirects);
      });
  }

  setInnerTabFromUrl(url: string): void {
    const match = url.match(/^\/portal\/[^\/]+\/[^\/]+\/([^\/]+)/);
    this.currentInnerTab = match ? match[1] : '';
    console.log(this.currentInnerTab);
  }

  getInnerTabFromUrl(url: string): string {
    const match = url.match(/^\/portal\/[^\/]+\/([^\/]+)/);
    return match ? match[1] : '';
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
