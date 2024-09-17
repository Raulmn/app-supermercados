import { AfterViewInit, ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Product, ProductsFormComponent, ProductsService } from '@products';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    ProductsFormComponent
  ],
  templateUrl: './edit-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditProductComponent implements AfterViewInit {
  

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  @ViewChild(ProductsFormComponent) productFormChildComponent!: ProductsFormComponent;
  
  
  ngAfterViewInit(): void {
    
    if ( !this.router.url.includes('edit') ) return;
    
    const productFormChild = this.productFormChildComponent.productForm as FormGroup
  
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.productsService.getProductById( id ) ),
      ).subscribe( product => {
        if ( !product ) this.router.navigateByUrl('/productos');
   
  
        productFormChild.reset(product);
        return;
      });
  }

  accionSubmitForm(productUpdate: Product) {
    this.productsService.updateProducts(productUpdate)
      .subscribe(() => this.router.navigateByUrl('/productos'));
  }




}
