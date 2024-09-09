import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsListComponent } from '@products';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductsListComponent
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListProductsComponent { }
