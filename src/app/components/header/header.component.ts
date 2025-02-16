import { NgClass } from '@angular/common';
import { AfterViewInit, Component, input, OnInit, Signal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthApiActions } from '../../store/actions/auth.actions';
import { selectIsLoggedIn } from '../../store/app.selectors';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgClass,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: Signal<boolean>;
  isOpen = signal<boolean>(false);

  constructor(private store: Store) {
    this.isLoggedIn = this.store.selectSignal(selectIsLoggedIn);
  }

  ngOnInit(): void {

  }

  logout() {
    this.store.dispatch(AuthApiActions.logout());
  }
}
