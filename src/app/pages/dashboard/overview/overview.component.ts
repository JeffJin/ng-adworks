import { Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

  async loadDevices() {
    const { DevicesComponent } = await import('../devices/devices.component');

  }
}
