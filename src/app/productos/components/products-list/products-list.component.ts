import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';


import { Product, ProductsService } from '@products';
import { DialogService, FilterPipe, SearchService } from '@commons';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    FilterPipe
  ],
  providers: [
    DialogService,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit{

  private dialogService = inject( DialogService );
  private searchService = inject( SearchService);
  public productsService = inject( ProductsService );
  
  public searchValue = computed( () => {
    console.log('computed', this.searchService.searchValue())
    return this.searchService.searchValue();
  });


  constructor() {
    this.productsService.getProducts();
  }


  ngOnInit(): void {
  }

  accionDelete(product: Product) {
    this.dialogService.openDialog({
      title: 'Eliminar producto',
      type: 'bg-danger',
      description: `Desea eliminar el producto "${product.name}"`
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.productsService.deleteProductById(product.id).subscribe();
      }
    });

  }

}
