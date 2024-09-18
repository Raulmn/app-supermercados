import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('debe crear el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe actualizar y obtener el valor de búsqueda correctamente', () => {
    service.setValue('prueba');
    expect(service.searchValue()).toBe('prueba');
  });
});
