import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
import { AuthApiActions } from '../../store/actions/auth.actions';
import { selectUser } from '../../store/app.selectors';

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
export class SideNavComponent implements OnInit, OnDestroy {
  protected isSidebarClosed = signal(true);
  protected hideMobileSidebar: boolean = true;
  protected user;
  private navigationEnd$;
  private isNotificationOpen: boolean = false;
  private unsubscribeNavigationEnd: Subscription | null = null;

  constructor(private store: Store, private router: Router) {
    this.user = this.store.selectSignal(selectUser);
    this.navigationEnd$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => (this.isSidebarClosed.set(true)))
    );
  }

  ngOnInit() {
    this. unsubscribeNavigationEnd = this.navigationEnd$.subscribe();
  }

  ngOnDestroy() {
    if(this.unsubscribeNavigationEnd) {
      this.unsubscribeNavigationEnd.unsubscribe();
    }
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
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  toggleNotifications($event:MouseEvent) {
    $event.stopPropagation();
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  onSidebarAnimationDone($event: any) {
    if ($event.toState === 'closed-sidebar') {
      this.hideMobileSidebar = true;
    }
  }

  onSidebarAnimationStart($event: any) {
    if ($event.toState === 'open-sidebar') {
      this.hideMobileSidebar = false;
    }
  }

  @HostListener('click', ['$event.target'])
  onClick(element: HTMLElement) {
    this.isProfileMenuOpen = false;
    this.isNotificationOpen = false;
  }

  logout() {
    this.store.dispatch(AuthApiActions.logout());
  }
}
