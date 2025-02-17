import { NgClass } from '@angular/common';
import { AfterViewInit, Component, input, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
import { AuthApiActions } from '../../store/actions/auth.actions';
import { selectIsLoggedIn } from '../../store/app.selectors';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: Signal<boolean>;
  isOpen = signal<boolean>(false);
  private navigationEnd$;
  private unsubscribeNavigationEnd: Subscription | null = null;

  constructor(private store: Store, private router: Router) {
    this.navigationEnd$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => (this.isOpen.set(false)))
    );
    this.isLoggedIn = this.store.selectSignal(selectIsLoggedIn);
  }

  ngOnInit() {
    this. unsubscribeNavigationEnd = this.navigationEnd$.subscribe();
  }

  ngOnDestroy() {
    if(this.unsubscribeNavigationEnd) {
      this.unsubscribeNavigationEnd.unsubscribe();
    }
  }

  logout() {
    this.store.dispatch(AuthApiActions.logout());
  }
}
