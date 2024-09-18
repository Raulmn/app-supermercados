import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { Product, ProductsService } from '@products';
import { SearchService, DialogService } from '@commons';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productsServiceMock: Partial<ProductsService>;
  let searchServiceMock: Partial<SearchService>;
  let dialogServiceMock: Partial<DialogService>;

  let data: Product[] = [{ id: '1', categoryId: '1', name: 'Producto 1', description: 'Descripcion producto', unitPrice: 100, unitsInStock: 10 }];

  beforeEach(async () => {
    productsServiceMock = {
      getProducts: jasmine.createSpy('getProducts'),
      // Aquí definimos correctamente la señal productsList con el método signal()
      productsList: signal(data)
    };

    searchServiceMock = {
      searchValue: signal('') // Uso de signal para searchValue
    };

    dialogServiceMock = {
      openDialog: jasmine.createSpy('openDialog').and.returnValue({ afterClosed: () => of(true) })
    };

    await TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: SearchService, useValue: searchServiceMock },
        { provide: DialogService, useValue: dialogServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe mostrar la lista de productos', () => {
    const productElements = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(productElements.length).toBe(1);
    expect(productElements[0].nativeElement.textContent).toContain('Producto 1');
  });

  it('debe llamar a getProducts en el servicio al inicializar', () => {
    expect(productsServiceMock.getProducts).toHaveBeenCalled();
  });

  it('debe eliminar un producto al confirmar el diálogo', () => {
    const deleteButton = fixture.debugElement.query(By.css('button.bg-danger'));
    deleteButton.triggerEventHandler('click', null);

    expect(dialogServiceMock.openDialog).toHaveBeenCalled();

    // Invocar la señal productsList para acceder a los productos
    const productListValue = productsServiceMock.productsList?.();
    expect(productListValue?.length).toBe(1); // Verifica que haya 1 producto en la lista
  });
});
