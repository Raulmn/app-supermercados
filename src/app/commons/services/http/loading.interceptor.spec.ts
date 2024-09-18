import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';
import { LoadingInterceptor, SkipLoading } from './loading.interceptor';
import { LoadingService } from '@commons';
import { HttpContext } from '@angular/common/http';

describe('LoadingInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let loadingServiceMock: Partial<LoadingService>;

  beforeEach(() => {
    loadingServiceMock = {
      loadingOn: jasmine.createSpy('loadingOn'),
      loadingOff: jasmine.createSpy('loadingOff'),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        { provide: LoadingService, useValue: loadingServiceMock },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe activar el loader al hacer una petición HTTP', () => {
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(loadingServiceMock.loadingOn).toHaveBeenCalled();

    req.flush({});
    expect(loadingServiceMock.loadingOff).toHaveBeenCalled();
  });

  it('no debe activar el loader si la petición usa SkipLoading', () => {
    httpClient.get('/test', { context: new HttpContext().set(SkipLoading, true) }).subscribe();

    const req = httpMock.expectOne('/test');
    expect(loadingServiceMock.loadingOn).not.toHaveBeenCalled();

    req.flush({});
    expect(loadingServiceMock.loadingOff).not.toHaveBeenCalled();
  });
});
