import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent, PageTitleComponent } from '@commons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    PageTitleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent { }
