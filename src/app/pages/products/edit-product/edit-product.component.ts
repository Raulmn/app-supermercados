import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsFormComponent, ProductsService } from '@products';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ProductsFormComponent
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditProductComponent implements OnInit, AfterViewInit {
  

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  @ViewChild(ProductsFormComponent) productFormChildComponent!: ProductsFormComponent;
  
  
  ngOnInit(): void {

    
  }
  
  ngAfterViewInit(): void {
    if ( !this.router.url.includes('edit') ) return;
    const productFormChild = this.productFormChildComponent.productForm as FormGroup
  
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.productsService.getProductById( id ) ),
      ).subscribe( product => {
        console.log('Producto: ', product);
        if ( !product ) {
          return this.router.navigateByUrl('/');
        }
   
  
        productFormChild.patchValue(product);
        // this.heroForm.reset( hero );
        return;
      });
  }




}
