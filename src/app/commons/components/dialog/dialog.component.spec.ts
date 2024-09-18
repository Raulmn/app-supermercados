import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogComponent>>;
  let closeBtn: DebugElement;
  let deleteBtn: DebugElement;

  const mockData = {
    title: 'Confirmar eliminación',
    description: '¿Estás seguro de que deseas eliminar este producto?',
    type: 'warning'
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, NoopAnimationsModule],
      declarations: [DialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<DialogComponent>>;
    fixture.detectChanges();

    closeBtn = fixture.debugElement.query(By.css('button[mat-dialog-close]'));
    deleteBtn = fixture.debugElement.query(By.css('button.bg-danger'));
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar los datos correctos en el template', () => {
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    const descriptionElement = fixture.debugElement.query(By.css('mat-dialog-content span')).nativeElement;

    expect(titleElement.textContent).toContain(mockData.title);
    expect(descriptionElement.textContent).toContain(mockData.description);
  });

  it('debe cerrar el diálogo cuando se presiona el botón "Cerrar"', () => {
    closeBtn.triggerEventHandler('click', null);
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });

  it('debe cerrar el diálogo con valor "true" al presionar el botón "Eliminar"', () => {
    deleteBtn.triggerEventHandler('click', null);
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });
});
