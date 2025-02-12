import { afterNextRender, AfterViewInit, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, HeaderComponent, FooterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private title: Title, private meta: Meta){
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
