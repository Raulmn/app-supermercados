import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, output, OutputEmitterRef } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Product, ProductsService } from '@products';
import { MatButtonModule } from '@angular/material/button';
import { GenerateIdService } from '@commons';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './products-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFormComponent implements OnInit {

  private productsService = inject(ProductsService);
  private generateIdService = inject(GenerateIdService);
  
  public submitForm = output<Product>();
  public categories = computed(() => this.productsService.categoriesList());

  public productForm = new FormBuilder().group({
    id:           new FormControl<string>(this.generateIdService.getRandomId(15, 1000000)),
    categoryId:   new FormControl<string>('', [Validators.required]),
    name:         new FormControl<string>('', [Validators.required]),
    description:  new FormControl<string>(''),
    unitPrice:    new FormControl<number>(0, [Validators.required]),
    unitsInStock: new FormControl<number>(0, [Validators.required]),
  });

  constructor() {
    this.productsService.getCategories();
  }
  
  ngOnInit(): void {
  }

  // TODO: Tareas
  // Editar y devolver guardado

  onSubmit() {
    console.log('Form', this.productForm)
    if(this.productForm.invalid) return;
    
    console.log('Form Value', this.productForm.value)
    this.submitForm.emit(this.productForm.value as Product);
  }

}
