import { ComponentFixture, TestBed } from '@angular/core/testing';
import CreateProductComponent from './create-product.component';
import { Category, ProductsService } from '@products';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '@products';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let productsServiceMock: Partial<ProductsService>;
  let routerMock: jasmine.SpyObj<Router>;

  const categories: Category[] = [
    {id: '1', name: 'Categoría 1', seoUrl: 'seo-url'},
    {id: '2', name: 'Categoría 2', seoUrl: 'seo-url-2'},
    {id: '3', name: 'Categoría 3', seoUrl: 'seo-url-3'}
  ]

  const newProduct: Product = {
    id: '1',
    name: 'Nuevo Producto',
    categoryId: '1',
    description: 'Descripción del producto',
    unitPrice: 100,
    unitsInStock: 50
  };

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    productsServiceMock = {
      getCategories: jasmine.createSpy('getCategories').and.callFake(() => categories),
      createNewProduct: jasmine.createSpy('createNewProduct').and.returnValue(of(newProduct))
    }
    

    await TestBed.configureTestingModule({
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;


  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar a createNewProduct y redirigir al enviar el formulario', () => {

    (productsServiceMock.createNewProduct as jasmine.Spy).and.returnValue(of(newProduct));

    component.accionSubmitForm(newProduct);

    expect(productsServiceMock.createNewProduct).toHaveBeenCalledWith(newProduct);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/productos');
  });
});
