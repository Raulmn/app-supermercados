import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';


import { Product, ProductsService } from '@products';
import { DialogService } from '@commons';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
  ],
  providers: [
    DialogService
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {

  public productsService = inject( ProductsService );
  public dialogService = inject( DialogService );

  constructor() {
    this.productsService.getProducts();
  }

  accionDelete(product: Product) {
    this.dialogService.openDialog({
      title: 'Eliminar producto',
      type: 'bg-danger',
      description: `Desea eliminar ${product.name}`
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.productsService.deleteProductById(product.id)
      }
    });

  }

}
