import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarNotificationService } from './snackbar-notification.service';

describe('SnackbarNotificationService', () => {
  let service: SnackbarNotificationService;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        SnackbarNotificationService,
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });

    service = TestBed.inject(SnackbarNotificationService);
    snackBarMock = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('debe crear el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe mostrar una notificación con el mensaje y duración predeterminada', () => {
    const message = 'Mensaje de prueba';
    service.showNotification(message);

    expect(snackBarMock.open).toHaveBeenCalledWith(message, 'Cerrar', {
      duration: 3000
    });
  });

  it('debe mostrar una notificación con un tiempo de cierre personalizado', () => {
    const message = 'Mensaje con tiempo personalizado';
    const customDuration = 5000;
    service.showNotification(message, customDuration);

    expect(snackBarMock.open).toHaveBeenCalledWith(message, 'Cerrar', {
      duration: customDuration
    });
  });
});
