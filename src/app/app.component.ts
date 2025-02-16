import { afterNextRender, AfterViewInit, Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { IUser } from './data/models/dtos';
import { selectUser } from './store/app.selectors';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, HeaderComponent, FooterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  user: Signal<IUser | null |undefined>;

  constructor(private router: Router,
              private store: Store,
              private title: Title,
              private meta: Meta){
    this.user = this.store.selectSignal(selectUser);
    afterNextRender(() => {
      // Safe to check `scrollHeight` because this will only run in the browser, not the server.
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Home / Adworks Main Page');
    this.meta.updateTag({
      'description': 'Adworks Main Page'
    });
  }
}
