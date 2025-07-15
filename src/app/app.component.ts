import { Component } from '@angular/core';
import { PortalComponent } from './components/portal/portal.component';
import { PortalBarComponent } from './components/portal-bar/portal-bar.component';

@Component({
  selector: 'app-root',
  imports: [PortalBarComponent,PortalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myApp';
}
