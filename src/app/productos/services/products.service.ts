import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Category, Product, ProductsData } from '../interfaces/products.interfaces';
import { environments } from '../../../environment/environments';

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

  constructor() {
    this.http.get<Product[]>(`${this.baseUrl}/products`)
    .subscribe( response => {
      console.log('Products data: ', response);
      this.#productsData.set(response)
    });
    // this.http.get<Category[]>(`${this.baseUrl}/categories`)
    // .subscribe( response => {
    //   console.log('Category data: ', response);
    //   this.#categoriesData.set(response)
    // });
  }

  /** Product Methods */
  getProductById(productId: number) {

  }

  createNewProduct() {

  }
  

  updateProducts(productId: number) {

  }

  deleteProductById(productId: number) {

  }



  /** Categories Methods */
  getCategoryById(categoryId: number) {

  }

  createCategory() {

  }

  updateCategory(categoryId: number) {

  }

  deleteCategoryById(categoryId: number) {

  }

}
