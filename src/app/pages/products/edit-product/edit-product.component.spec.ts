import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import EditProductComponent from './edit-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductsService, Product, ProductsFormComponent } from '@products';


describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let productsServiceMock: jasmine.SpyObj<ProductsService>;
  let routerMock: jasmine.SpyObj<Router>;
  let activatedRouteMock: any;

  let product: Product = {
    id: '1',
    name: 'Producto Actualizado',
    categoryId: 'cat1',
    description: 'Descripción Actualizada',
    unitPrice: 150,
    unitsInStock: 30
  };

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProductById', 'updateProducts']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    activatedRouteMock = {
      params: of({ id: '1' })
    };

    await TestBed.configureTestingModule({
      declarations: [EditProductComponent, ProductsFormComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    productsServiceMock = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar el producto en el formulario si la URL contiene "edit"', fakeAsync(() => {
    const product: Product = {
      id: '1',
      name: 'Producto Test',
      categoryId: 'cat1',
      description: 'Descripción',
      unitPrice: 100,
      unitsInStock: 50
    };

    productsServiceMock.getProductById.and.returnValue(of(product));

    fixture.detectChanges();
    tick();

    expect(productsServiceMock.getProductById).toHaveBeenCalledWith('1');
    const productFormChild = component.productFormChildComponent.productForm;
    expect(productFormChild.value.name).toBe('Producto Test');
  }));

  it('debe llamar a updateProducts y redirigir al enviar el formulario', () => {

    productsServiceMock.updateProducts.and.returnValue(of(product));

    component.accionSubmitForm(product);

    expect(productsServiceMock.updateProducts).toHaveBeenCalledWith(product);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/productos');
  });
});
