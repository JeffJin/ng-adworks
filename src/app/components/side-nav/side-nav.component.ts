import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { single } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  protected sidebarClosed = signal(true);
  closeSidebar() {
    this.sidebarClosed.set(true);
  }

  openSidebar() {
    this.sidebarClosed.set(false);
  }
}
