import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import EditProductComponent from './edit-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductsService, Product, ProductsFormComponent, Category } from '@products';
import { signal } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let productsServiceMock: Partial<ProductsService>;
  let routerMock: jasmine.SpyObj<Router>;
  let activatedRouteMock: any;

  const categories: Category[] = [
    {id: '1', name: 'Categoría 1', seoUrl: 'seo-url'},
    {id: '2', name: 'Categoría 2', seoUrl: 'seo-url-2'},
    {id: '3', name: 'Categoría 3', seoUrl: 'seo-url-3'}
  ]
  
  const product: Product = {
    id: '1',
    name: 'Producto test',
    categoryId: 'cat1',
    description: 'Descripción test',
    unitPrice: 150,
    unitsInStock: 30
  };

  const productActualizado: Product = {
    id: '1',
    name: 'Producto Actualizado',
    categoryId: 'cat1',
    description: 'Descripción Actualizada',
    unitPrice: 150,
    unitsInStock: 30
  };

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    activatedRouteMock = {
      params: of({ id: '1' })
    };

    productsServiceMock = {
      getCategories: jasmine.createSpy('getCategories').and.callFake(() => categories),
      updateProducts: jasmine.createSpy('updateProducts').and.returnValue(of(productActualizado)),
      getProductById: jasmine.createSpy('getProductById').and.returnValue(of(product)),
      categoriesList: signal(categories)
    }

    await TestBed.configureTestingModule({
      imports: [
        ProductsFormComponent,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl'], { url: '/productos/edit/1'});
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar el producto en el formulario si la URL contiene "edit"', fakeAsync(() => {
    tick();
    fixture.detectChanges();

    expect(productsServiceMock.getProductById).toHaveBeenCalledWith('1');
    const productFormChild = component.productFormChildComponent.productForm;
    expect(productFormChild.value.name).toBe('Producto test');
  }));

  it('debe llamar a updateProducts y redirigir al enviar el formulario', () => {

    (productsServiceMock.updateProducts as jasmine.Spy).and.returnValue(of(productActualizado));

    component.accionSubmitForm(productActualizado);

    expect(productsServiceMock.updateProducts).toHaveBeenCalledWith(productActualizado);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/productos');
  });
});
