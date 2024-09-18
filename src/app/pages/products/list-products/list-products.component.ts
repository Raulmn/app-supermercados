import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { SearchComponent } from '@commons';
import { ProductsListComponent } from '@products';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductsListComponent,
    SearchComponent,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './list-products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListProductsComponent { }
