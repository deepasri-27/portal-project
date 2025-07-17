import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TileData } from '../types/tile-data.types';



@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
  @Input() profileUrl: string = ''; // optional profile name or icon
  @Input() tileData: TileData[] = [];
  @Input() portal:string='';

  showDropdown = false;

  constructor(private router: Router) {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  logout() {
     document.cookie = `${this.portal}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    console.log("logout: "+this.portal);
    this.router.navigate(['/']);
  }
}
