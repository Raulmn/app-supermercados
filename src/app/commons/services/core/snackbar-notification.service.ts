import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarNotificationService {

  constructor() { }

  private _snackBar = inject(MatSnackBar);
  
  private defaultTimeToClose: number = 3000;

  public showNotification(message: string, timeToClose: number = this.defaultTimeToClose) {
    this._snackBar.open(message, 'Cerrar', {
      duration: timeToClose
    });
  }

}
