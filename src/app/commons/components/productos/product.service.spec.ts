import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environments } from '../../../../environment/environments';
import { SnackbarNotificationService } from '@commons';
import { Product, Category } from '@products';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  let notificationServiceMock: Partial<SnackbarNotificationService>;

  beforeEach(() => {
    notificationServiceMock = {
      showNotification: jasmine.createSpy('showNotification'),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService,
        { provide: SnackbarNotificationService, useValue: notificationServiceMock }
      ]
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe obtener la lista de productos', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Producto 1', categoryId: 'cat1', description: 'Desc 1', unitPrice: 100, unitsInStock: 50 }
    ];

    service.getProducts();

    const req = httpMock.expectOne(`${environments.baseUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);

    expect(service.productsList()).toEqual(mockProducts);
  });

  it('debe crear un nuevo producto y mostrar notificación', () => {
    const mockProduct: Product = { id: '1', name: 'Producto 1', categoryId: 'cat1', description: 'Desc 1', unitPrice: 100, unitsInStock: 50 };

    service.createNewProduct(mockProduct).subscribe();

    const req = httpMock.expectOne(`${environments.baseUrl}/products`);
    expect(req.request.method).toBe('POST');
    req.flush(mockProduct);

    expect(notificationServiceMock.showNotification).toHaveBeenCalledWith(`${mockProduct.name}, se ha creado correctamente`);
  });

  it('debe actualizar un producto y mostrar notificación', () => {
    const mockProduct: Product = { id: '1', name: 'Producto 1', categoryId: 'cat1', description: 'Desc 1', unitPrice: 100, unitsInStock: 50 };

    service.updateProducts(mockProduct).subscribe();

    const req = httpMock.expectOne(`${environments.baseUrl}/products/${mockProduct.id}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockProduct);

    expect(notificationServiceMock.showNotification).toHaveBeenCalledWith(`${mockProduct.name}, se ha actualizado correctamente`);
  });

  it('debe eliminar un producto y mostrar notificación', () => {
    const mockProductId = '1';

    service.deleteProductById(mockProductId).subscribe();

    const req = httpMock.expectOne(`${environments.baseUrl}/products/${mockProductId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);

    expect(notificationServiceMock.showNotification).toHaveBeenCalledWith('El producto se ha eliminado correctamente');
  });
});
