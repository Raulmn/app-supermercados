import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Category } from '@products';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFormComponent {


  public productsForm = new FormBuilder().group({
    id:        new FormControl<string>('', { nonNullable: true }),
    categoryId:        new FormControl<Category[]>([], { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true }),
    description: new FormControl<string>(''),
    unitPrice: new FormControl<number>(0),
    unitsInStock: new FormControl<number>(0),
  });

  constructor() {

  }

  // TODO: Tareas
  // Asignar formControlName del nuevo formulario
  // Traer Las categorías y añadirlas al formulario



}
