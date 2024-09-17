import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-404',
  standalone: true,
  template: `<p>Upps!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class error404Component { }
