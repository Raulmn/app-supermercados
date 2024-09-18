import { ComponentFixture, TestBed } from '@angular/core/testing';
import TpvComponent from './tpv.component';
import { By } from '@angular/platform-browser';

describe('TpvComponent', () => {
  let component: TpvComponent;
  let fixture: ComponentFixture<TpvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(TpvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el mensaje "tpv works!" en la plantilla', () => {
    const element = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(element.textContent).toContain('tpv works!');
  });
});
