import { Component, Input } from '@angular/core';
import { TileData } from '../types/tile-data.types';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
@Component({
  selector: 'app-top-tab',
  standalone: true,
  imports: [RouterLink,NgForOf],
  templateUrl: './top-tab.component.html',
  styleUrl: './top-tab.component.css'
})
export class TopTabComponent {
  @Input() tabs: TileData[] = [];
}
