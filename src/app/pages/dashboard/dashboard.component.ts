import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardToolbarComponent } from '../../components/dashboard-toolbar/dashboard-toolbar.component';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    SideNavComponent,
    RouterOutlet,
    DashboardToolbarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
