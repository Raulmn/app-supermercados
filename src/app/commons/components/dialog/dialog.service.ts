import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { DialogData } from './dialog.interface';

@Injectable()
export class DialogService {

  dialog = inject(MatDialog);
  
  constructor() { }

  openDialog(data: DialogData) {
    return this.dialog.open(DialogComponent, { data });
  }

}
