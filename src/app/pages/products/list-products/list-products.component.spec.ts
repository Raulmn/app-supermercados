import { ComponentFixture, TestBed } from '@angular/core/testing';
import ListProductsComponent from './list-products.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsListComponent } from '@products';
import { SearchComponent } from '@commons';
import { MatButtonModule } from '@angular/material/button';

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListProductsComponent],
      imports: [
        RouterTestingModule,  // Importar para simular las rutas
        MatButtonModule,
        ProductsListComponent,
        SearchComponent
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
    const button = fixture.debugElement.query(By.css('button[routerLink="/productos/nuevo"]'));
    expect(button).toBeTruthy();
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
