import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Header} from './header/header';
import {Footer} from './footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Footer, RouterModule],
  template: `
    <app-header></app-header>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.scss'],
})
export class App {
  title = 'HomeBoardAI';
}
