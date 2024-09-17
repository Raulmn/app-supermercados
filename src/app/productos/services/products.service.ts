import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, of, take, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environments } from '../../../environment/environments';
import { Category, Product } from '@products';
import { SnackbarNotificationService } from '@commons';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environments.baseUrl;
  private _http = inject( HttpClient );
  private _notificationService = inject(SnackbarNotificationService);

  #productsData = signal<Product[]>([]);
  #categoriesData = signal<Category[]>([]);

  public productsList = computed( () => this.#productsData());
  public categoriesList = computed( () => this.#categoriesData());

  constructor() { }

  /** Product Methods */
  getProducts():void {
    this._http.get<Product[]>(`${this.baseUrl}/products`)
      .pipe(
        take(1)
      )
      .subscribe( response => this.#productsData.set(response));
  }

  getProductById(productId: string): Observable<Product | undefined> {
    if ( !productId ) throw Error('El "id" del producto es obligatoria');
    
    return this._http.get<Product>(`${this.baseUrl}/products/${productId}`)
      .pipe(
        take(1)
      );
  }

  createNewProduct(product: Product) {
    if ( !product ) throw Error('Es necasaria la información del producto');

    return this._http.post<Product>(`${this.baseUrl}/products`, product)
      .pipe(
        take(1),
        tap({ complete: () => this._notificationService.showNotification(`${ product.name }, se ha creado correctamente`) })
      );
  }
  
  updateProducts(product: Product) {
    if ( !product.id ) throw Error('El "id" del producto es obligatoria');

    return this._http.patch<Product>(`${this.baseUrl}/products/${product.id}`, product)
    .pipe(
        take(1),
        tap({ complete: () => this._notificationService.showNotification(`${ product.name }, se ha actualizado correctamente`) })
      );

  }

  deleteProductById(productId: string) {
    if ( !productId ) throw Error('El "id" del producto es obligatoria');

    return this._http.delete<Product>(`${this.baseUrl}/products/${productId}`)
    .pipe(
        take(1),
        tap({ complete: () => {
            this._notificationService.showNotification('El producto se ha eliminado correctamente');
            this.getProducts();
          }
        })
      );
  }



  /** Categories Methods */
  getCategories() {
    this._http.get<Category[]>(`${this.baseUrl}/categories`)
    .pipe(
        take(1),
      )
    .subscribe( response => this.#categoriesData.set(response));
  }
  
  getCategoryById(categoryId: string) {

  }

  createCategory() {

  }

  updateCategory(categoryId: string) {

  }

  deleteCategoryById(categoryId: string) {

  }

}
