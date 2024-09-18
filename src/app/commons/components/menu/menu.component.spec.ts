import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatMenuModule,
      ],
      declarations: [MenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el nombre y versión de la aplicación', () => {
    const appNameElement = fixture.debugElement.query(By.css('span.cursor-pointer')).nativeElement;
    expect(appNameElement.textContent).toContain(component.appName);
    expect(appNameElement.textContent).toContain('v' + component.appVersion);
  });

  it('debe generar los enlaces correctos en el menú', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('a[mat-button]'));

    expect(menuItems.length).toBe(component.menuItems.length);

    menuItems.forEach((menuItem, index) => {
      const expectedLabel = component.menuItems[index].label;
      const expectedUrl = component.menuItems[index].url;

      expect(menuItem.nativeElement.textContent.trim()).toBe(expectedLabel);
      expect(menuItem.attributes['ng-reflect-router-link']).toBe(expectedUrl);
    });
  });
});
