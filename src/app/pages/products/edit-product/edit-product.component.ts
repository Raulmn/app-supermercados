import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditProductComponent { }
