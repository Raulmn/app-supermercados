import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('debe crear el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe activar el estado de carga cuando se llama a loadingOn', (done: DoneFn) => {
    service.loadingOn();
    service.loading$.subscribe((loading) => {
      expect(loading).toBeTrue();
      done();
    });
  });

  it('debe desactivar el estado de carga cuando se llama a loadingOff', (done: DoneFn) => {
    service.loadingOff();
    service.loading$.subscribe((loading) => {
      expect(loading).toBeFalse();
      done();
    });
  });

  it('debe inicializar con el estado de carga en false', (done: DoneFn) => {
    service.loading$.subscribe((loading) => {
      expect(loading).toBeFalse();
      done();
    });
  });
});
