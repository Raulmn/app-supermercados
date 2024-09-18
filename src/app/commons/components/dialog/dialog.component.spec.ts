import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<DialogComponent>>;

  const mockData = {
    title: 'Confirmar eliminación',
    description: '¿Estás seguro de que deseas eliminar este producto?',
    type: 'warning'
  };

  beforeEach(async () => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: dialogRefMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    const closeBtn: DebugElement = fixture.debugElement.query(By.css('button[mat-dialog-close]'));
    expect(closeBtn).toBeTruthy();
    
    closeBtn.nativeElement.click();
    expect(dialogRefMock.close).toHaveBeenCalledWith('');
  });
  
  it('debe cerrar el diálogo con valor "true" al presionar el botón "Eliminar"', () => {
    const deleteBtn: DebugElement = fixture.debugElement.query(By.css('button.bg-danger'));
    expect(deleteBtn).toBeTruthy();
    
    deleteBtn.nativeElement.click();
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });
});
