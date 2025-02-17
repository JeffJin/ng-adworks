import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgClass, NgStyle } from '@angular/common';
import { Component, HostListener, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgStyle
  ],
  animations: [
    trigger('openCloseProfile', [
      state(
        'open-profile',
        style({
          opacity: 1,
          transform: 'scale(1, 1)'
        }),
      ),
      state(
        'closed-profile',
        style({
          opacity: 0,
          transform: 'scale(0.95, 0.95)'
        }),
      ),
      transition(':leave', [ animate('100ms ease-in') ]),
      transition('open-profile => closed-profile', [ animate('100ms ease-in') ]),
      transition('closed-profile => open-profile', [ animate('75ms ease-out') ]),
    ]),
    trigger('openCloseSidebar', [
      state(
        'open-sidebar',
        style({
          opacity: 1,
        }),
      ),
      state(
        'closed-sidebar',
        style({
          opacity: 0,
        }),
      ),
      transition(':leave', [ animate('300ms') ]),
      transition('open-sidebar => closed-sidebar', [ animate('300ms') ]),
      transition('closed-sidebar => open-sidebar', [ animate('300ms') ]),
    ]),
    trigger('openCloseSidebarSlider', [
      state(
        'open-sidebar-slider',
        style({
          transform: 'translateX(0)'
        }),
      ),
      state(
        'closed-sidebar-slider',
        style({
          transform: 'translateX(-100%)'
        }),
      ),
      transition(
        ':leave',
        [ animate('300ms ease-in-out') ]
      ),
      transition(
        'open-sidebar-slider => closed-sidebar-slider',
        [ animate('300ms ease-in-out') ]
      ),
      transition(
        'closed-sidebar-slider => open-sidebar-slider',
        [ animate('300ms ease-in-out') ]
      ),
    ])
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  protected isSidebarClosed = signal(true);
  protected hideMobileSidebar: boolean = true;

  private navigationEnd$;
  private isNotificationOpen: boolean = false;

  constructor(private router: Router) {
    this.navigationEnd$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => (this.isSidebarClosed.set(true)))
    );
  }

  ngOnInit() {
    this.navigationEnd$.subscribe();
  }

  get openCloseSidebarSliderMenu(): string {
    return this.isSidebarClosed() ? 'closed-sidebar-slider' : 'open-sidebar-slider';
  }

  get openCloseSidebarMenu(): string {
    return this.isSidebarClosed() ? 'closed-sidebar' : 'open-sidebar';
  }

  toggleSidebarMenu($event: MouseEvent) {
    this.isSidebarClosed.update((val) => !val);
  }

  isProfileMenuOpen = false
  get openCloseProfileMenu(): string {
    return this.isProfileMenuOpen ? 'open-profile' : 'closed-profile';
  }

  toggleProfileMenu($event:MouseEvent) {
    $event.stopPropagation();
    console.log('toggle profile menu');
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  toggleNotifications($event:MouseEvent) {
    console.log('toggle notifications');
    $event.stopPropagation();
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  onSidebarAnimationDone($event: any) {
    console.log('onSidebarAnimationDone', $event);
    if ($event.toState === 'closed-sidebar') {
      this.hideMobileSidebar = true;
    }
  }

  onSidebarAnimationStart($event: any) {
    console.log('onSidebarAnimationDone', $event);
    if ($event.toState === 'open-sidebar') {
      this.hideMobileSidebar = false;
    }
  }

  @HostListener('click', ['$event.target'])
  onClick(element: HTMLElement) {
    console.log('element', element);
    this.isProfileMenuOpen = false;
    this.isNotificationOpen = false;
  }
}
