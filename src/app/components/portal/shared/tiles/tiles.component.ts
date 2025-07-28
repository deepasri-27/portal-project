import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PageTile } from '../types/page-tile.types';

@Component({
  selector: 'app-tiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.css']
})
export class TilesComponent {
  constructor(private router: Router) {}
  @Input() userName: string = '';
  @Input() portalName: string = '';
  @Input() tiles: Array<PageTile> = [];

  navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
