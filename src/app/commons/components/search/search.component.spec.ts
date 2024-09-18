import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { SearchService } from '@commons';
import { signal } from '@angular/core';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchServiceMock: Partial<SearchService>;

  beforeEach(async () => {
    // Mock del servicio SearchService utilizando signal en lugar de Observable
    searchServiceMock = {
      searchValue: signal(''),
      setValue: jasmine.createSpy('setValue'),
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule
      ],
      declarations: [SearchComponent],
      providers: [
        { provide: SearchService, useValue: searchServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe actualizar el valor de búsqueda en el servicio al ingresar texto', (done) => {
    // Simula la entrada de texto en el campo de búsqueda
    const inputElement = fixture.debugElement.query(By.css('input[formControlName="searchValue"]')).nativeElement;

    inputElement.value = 'producto';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Espera 300ms para el debounce
    setTimeout(() => {
      expect(searchServiceMock.setValue).toHaveBeenCalledWith('producto');
      done();
    }, 300);
  });

  it('debe mostrar el valor ingresado en el campo de búsqueda', () => {
    const inputElement = fixture.debugElement.query(By.css('input[formControlName="searchValue"]')).nativeElement;

    inputElement.value = 'nuevo producto';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('nuevo producto');
  });
});
