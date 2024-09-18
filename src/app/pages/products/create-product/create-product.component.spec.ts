import { ComponentFixture, TestBed } from '@angular/core/testing';
import CreateProductComponent from './create-product.component';
import { ProductsService } from '@products';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '@products';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let productsServiceMock: jasmine.SpyObj<ProductsService>;
  let routerMock: jasmine.SpyObj<Router>;

  let newProduct: Product = {
    id: '1',
    name: 'Nuevo Producto',
    categoryId: '1',
    description: 'Descripción del producto',
    unitPrice: 100,
    unitsInStock: 50
  };

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['createNewProduct']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [CreateProductComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    productsServiceMock = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar a createNewProduct y redirigir al enviar el formulario', () => {

    productsServiceMock.createNewProduct.and.returnValue(of(newProduct));

    component.accionSubmitForm(newProduct);

    expect(productsServiceMock.createNewProduct).toHaveBeenCalledWith(newProduct);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/productos');
  });
});
