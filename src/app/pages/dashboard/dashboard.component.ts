import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    SideNavComponent,
    RouterOutlet,
    DashboardHeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
