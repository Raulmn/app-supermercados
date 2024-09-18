import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Event, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LoaderSpinnerComponent } from './loader-spinner.component';
import { LoadingService } from '@commons';
import { of, Subject } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

describe('LoaderSpinnerComponent', () => {
  let component: LoaderSpinnerComponent;
  let fixture: ComponentFixture<LoaderSpinnerComponent>;
  let loadingServiceMock: Partial<LoadingService>;
  let routerMock: Partial<Router>;
  let routerEvents$: Subject<Event>;

  beforeEach(async () => {
    routerEvents$ = new Subject<Event>();

    loadingServiceMock = {
      loading$: of(false), // valor inicial, puede cambiar en los tests
      loadingOn: jasmine.createSpy('loadingOn'),
      loadingOff: jasmine.createSpy('loadingOff'),
    };

    routerMock = {
      events: routerEvents$.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [LoaderSpinnerComponent],
      providers: [
        { provide: LoadingService, useValue: loadingServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el spinner cuando loading$ es true', () => {
    loadingServiceMock.loading$ = of(true);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.directive(MatProgressSpinner));
    expect(spinner).toBeTruthy();
  });

  it('no debe mostrar el spinner cuando loading$ es false', () => {
    loadingServiceMock.loading$ = of(false);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.directive(MatProgressSpinner));
    expect(spinner).toBeFalsy();
  });

  it('debe activar el loading cuando se produce RouteConfigLoadStart', () => {
    routerEvents$.next(new RouteConfigLoadStart({}));

    expect(loadingServiceMock.loadingOn).toHaveBeenCalled();
  });

  it('debe desactivar el loading cuando se produce RouteConfigLoadEnd', () => {
    routerEvents$.next(new RouteConfigLoadEnd({}));

    expect(loadingServiceMock.loadingOff).toHaveBeenCalled();
  });
});
