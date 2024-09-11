import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, take } from 'rxjs';

import { environments } from '../../../environment/environments';
import { Category, Product } from '@products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environments.baseUrl;
  private http = inject( HttpClient );

  #productsData = signal<Product[]>([]);
  #categoriesData = signal<Category[]>([]);

  public productsList = computed( () => this.#productsData());
  public categoriesList = computed( () => this.#categoriesData());

  constructor() { }

  /** Product Methods */
  getProducts():void {
    this.http.get<Product[]>(`${this.baseUrl}/products`)
      .pipe(
        take(1)
      )
      .subscribe( response => {
        console.log('Products data: ', response);
        this.#productsData.set(response)
      });
  }

  getProductById(productId: number):Observable<Product | undefined> {
    return this.http.get<Product | undefined>(`${this.baseUrl}/products/${productId}`)
      .pipe(
        catchError( error => of(undefined) ),
        take(1)
      )
  }

  createNewProduct() {

  }
  

  updateProducts(productId: number) {

  }

  deleteProductById(productId: number) {

  }



  /** Categories Methods */
  getCategories() {
    this.http.get<Category[]>(`${this.baseUrl}/categories`)
    .pipe(
        take(1),
      )
    .subscribe( response => {
      console.log('Category data: ', response);
      this.#categoriesData.set(response)
    });
  }
  
  getCategoryById(categoryId: number) {

  }

  createCategory() {

  }

  updateCategory(categoryId: number) {

  }

  deleteCategoryById(categoryId: number) {

  }

}
