import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PageTile } from '../types/page-tile.types';
import { CumulativeDataTile } from '../types/cumulative-data.types';

@Component({
  selector: 'app-tiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.css']
})
export class TilesComponent {
  constructor(private router: Router) {}
  
  // Welcome section inputs
  @Input() userName: string = '';
  @Input() userId: string = '';
  
  // Cumulative data section inputs
  @Input() cumulativeData: CumulativeDataTile[] = [];
  
  // Tiles section inputs
  @Input() tiles: Array<PageTile> = [];

  getCurrentDate(): string {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  }

  navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
