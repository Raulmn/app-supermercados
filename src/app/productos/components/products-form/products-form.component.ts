import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Category, ProductsService } from '@products';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFormComponent implements OnInit {

  private productsService = inject(ProductsService);

  public categories = computed(() => this.productsService.categoriesList());

  public productForm = new FormBuilder().group({
    id:           new FormControl<string>('', { nonNullable: true }),
    categoryId:   new FormControl<number>(0),
    name:         new FormControl<string>('', { nonNullable: true }),
    description:  new FormControl<string>(''),
    unitPrice:    new FormControl<number>(0),
    unitsInStock: new FormControl<number>(0),
  });

  constructor() {
    this.productsService.getCategories();
  }
  
  ngOnInit(): void {
  }

  // TODO: Tareas
  // Precargar datos del producto
  // Editar y devolver guardado

  onSubmit() {

  }

}
