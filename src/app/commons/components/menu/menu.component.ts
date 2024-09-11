import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { displayName, version } from '../../../../../package.json';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatMenuModule,
  ],
  templateUrl: './menu.component.html', 
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {

  public appName: string = displayName;
  public appVersion: string = version;

  public menuItems = [
    { label: 'Dashboard', url: './dashboard' },
    { label: 'TPV', url: './tpv' },
    { label: 'Productos', url: './productos' },
  ];

}
