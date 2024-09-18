import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tpv',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>tpv works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TpvComponent { }
