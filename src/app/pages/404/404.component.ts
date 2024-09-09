import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>404 Page Not Found!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class error404Component { }
