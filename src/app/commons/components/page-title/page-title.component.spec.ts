import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTitleComponent } from './page-title.component';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

describe('PageTitleComponent', () => {
  let component: PageTitleComponent;
  let fixture: ComponentFixture<PageTitleComponent>;
  let routerMock: Partial<Router>;
  let titleServiceMock: Partial<Title>;
  let changeDetectorRefMock: Partial<ChangeDetectorRef>;

  beforeEach(async () => {
    // Mock del Router para simular el evento NavigationEnd
    routerMock = {
      events: of(new NavigationEnd(1, '/test', '/test')),
    };

    // Mock del servicio Title para obtener el título actual
    titleServiceMock = {
      getTitle: jasmine.createSpy('getTitle').and.returnValue('Test Page'),
    };

    changeDetectorRefMock = {
      detectChanges: jasmine.createSpy('detectChanges'),
    };

    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: Title, useValue: titleServiceMock },
        { provide: ChangeDetectorRef, useValue: changeDetectorRefMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe actualizar el título de la página al navegar', () => {
    // Simula un evento de navegación
    component.ngOnInit();
    fixture.detectChanges();

    // Verifica que el título se haya actualizado correctamente
    expect(component.titlePage).toBe('Test Page');
    expect(changeDetectorRefMock.detectChanges).toHaveBeenCalled();
  });

  it('debe mostrar el título correcto en el template', () => {
    component.titlePage = 'Test Page';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h6')).nativeElement;
    expect(titleElement.textContent).toContain('Test Page');
  });
});
