import { Component } from '@angular/core';
import { PortalComponent } from './components/portal/portal.component';
import { PortalBarComponent } from './components/portal-bar/portal-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myApp';
}
