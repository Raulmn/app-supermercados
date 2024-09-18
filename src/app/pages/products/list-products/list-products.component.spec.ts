import { ComponentFixture, TestBed } from '@angular/core/testing';
import ListProductsComponent from './list-products.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsListComponent, ProductsService } from '@products';
import { SearchComponent } from '@commons';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        HttpClientTestingModule,
        ProductsListComponent,
        SearchComponent,
        BrowserAnimationsModule
      ],
      providers: [
        ProductsService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe contener el botón "Nuevo producto" que navega a /productos/nuevo', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent).toContain('Nuevo producto', 'El texto del botón no es Nuevo producto')
  });

  it('debe contener el componente de búsqueda', () => {
    const searchComponent = fixture.debugElement.query(By.directive(SearchComponent));
    expect(searchComponent).toBeTruthy();
  });

  it('debe contener el componente de listado de productos', () => {
    const productsListComponent = fixture.debugElement.query(By.directive(ProductsListComponent));
    expect(productsListComponent).toBeTruthy();
  });
});
