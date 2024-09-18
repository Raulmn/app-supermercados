import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { Product, ProductsService } from '@products';
import { SearchService, DialogService } from '@commons';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productsServiceMock: Partial<ProductsService>;
  let searchServiceMock: jasmine.SpyObj<SearchService>;
  let dialogServiceMock: jasmine.SpyObj<DialogService>;
  let matDialogRefMock: jasmine.SpyObj<MatDialogRef<any>>;

  const product: Product[] = [{ id: '1', categoryId: '1', name: 'Producto 1', description: 'Descripcion producto', unitPrice: 100, unitsInStock: 10 }];

  beforeEach(async () => {

    matDialogRefMock = jasmine.createSpyObj('MatDialogref', ['afterClosed']);

    // productsServiceMock = jasmine.createSpyObj('ProductsService', ['deleteProductById', 'getProducts']);
    dialogServiceMock = jasmine.createSpyObj('DialogService', ['openDialog']);
    searchServiceMock = jasmine.createSpyObj('SearchService', ['searchValue']);


    productsServiceMock = {
      getProducts: jasmine.createSpy('getProducts'),
      // Aquí definimos correctamente la señal productsList con el método signal()
      productsList: signal(product)
    };

    // searchServiceMock = {
    //   searchValue: signal('') // Uso de signal para searchValue
    // };

    // dialogServiceMock = {
    //   openDialog: jasmine.createSpy('openDialog').and.returnValue({ afterClosed: () => of(true) })
    // };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatChipsModule,
        MatButtonModule
      ],
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
    
    matDialogRefMock.afterClosed.and.returnValue(of(true));
    dialogServiceMock.openDialog.and.returnValue(matDialogRefMock);
    // dialogServiceMock.openDialog.and.returnValue({
    //   afterClosed: () => of(true)
    // });

    component.accionDelete(product[0])

    expect(dialogServiceMock.openDialog).toHaveBeenCalled();

    expect(productsServiceMock.deleteProductById).toHaveBeenCalledWith('1');
  });
});
