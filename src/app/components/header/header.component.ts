import { NgClass } from '@angular/common';
import { AfterViewInit, Component, input, OnInit, Signal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../store/app.selectors';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: Signal<boolean>;

  constructor(private store: Store) {
    this.isLoggedIn = this.store.selectSignal(selectIsLoggedIn);
  }

  ngOnInit(): void {

  }
}
