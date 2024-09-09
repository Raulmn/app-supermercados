import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateProductComponent { }
