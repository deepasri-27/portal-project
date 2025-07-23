import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortalBarComponent } from '../portal-bar/portal-bar.component';
@Component({
  selector: 'app-portal',
  imports: [RouterOutlet,PortalBarComponent],
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent {

}

