import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent, PageTitleComponent } from '@commons';
import { LoaderSpinnerComponent } from './commons/components/loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    PageTitleComponent,
    LoaderSpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent { }
