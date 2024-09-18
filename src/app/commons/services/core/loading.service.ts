import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = 
    new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor() { }

  loadingOn() {
    console.log('loading on');
    this.loadingSubject.next(true);
  }
  
  loadingOff() {
    console.log('loading off');
    this.loadingSubject.next(false);
  }

}
