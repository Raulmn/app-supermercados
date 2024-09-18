import { ComponentFixture, TestBed } from '@angular/core/testing';
import DashboardComponent from './dashboard.component';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el mensaje "dashboard works!" en la plantilla', () => {
    const element = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(element.textContent).toContain('dashboard works!');
  });
});
