import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsFormComponent } from './products-form.component';
import { Category, ProductsService } from '@products';
import { GenerateIdService } from '@commons';
import { ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;
  let productsServiceMock: Partial<ProductsService>;
  let generateIdServiceMock: Partial<GenerateIdService>;

  let data: Category[] = [{ id: 'cat1', name: 'Categoría 1', seoUrl: 'seo-url' }]

  beforeEach(async () => {
    productsServiceMock = {
      getCategories: jasmine.createSpy('getCategories'),
      categoriesList: signal(data) // Uso de signal en lugar de Spy
    };

    generateIdServiceMock = {
      getRandomId: jasmine.createSpy('getRandomId').and.returnValue('12345')
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: GenerateIdService, useValue: generateIdServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar las categorías en el formulario', () => {
    expect(productsServiceMock.getCategories).toHaveBeenCalled();
    expect(component.categories()).toEqual(data);
  });

  it('debe emitir el valor del formulario al enviarlo', () => {
    spyOn(component.submitForm, 'emit');

    component.productForm.setValue({
      id: '12345',
      name: 'Producto Test',
      categoryId: 'cat1',
      description: 'Descripción Test',
      unitPrice: 10,
      unitsInStock: 100
    });

    component.onSubmit();

    expect(component.submitForm.emit).toHaveBeenCalledWith({
      id: '12345',
      name: 'Producto Test',
      categoryId: 'cat1',
      description: 'Descripción Test',
      unitPrice: 10,
      unitsInStock: 100
    });
  });
});
