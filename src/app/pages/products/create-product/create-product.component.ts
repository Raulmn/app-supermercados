import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Product, ProductsFormComponent, ProductsService } from '@products';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    ProductsFormComponent
  ],
  templateUrl: './create-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateProductComponent {

  private router = inject(Router);
  private productsService = inject(ProductsService);


  accionSubmitForm(newProduct: Product) {
    console.log('nuevo producto: ',  newProduct);
    this.productsService.createNewProduct(newProduct)
      .subscribe(() => this.router.navigateByUrl('/productos'));
  }

}
