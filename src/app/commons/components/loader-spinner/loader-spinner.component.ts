import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

import { LoadingService } from '@commons';
import { delay, Observable, tap } from 'rxjs';


@Component({
  selector: 'app-loader-spinner',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './loader-spinner.component.html',
  styleUrl: './loader-spinner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderSpinnerComponent implements OnInit {
  
  private _loadingService = inject(LoadingService)
  private _router = inject(Router)
  
  public mode: ProgressSpinnerMode = 'indeterminate';
  public loading$: Observable<boolean>;

  constructor() {
    this.loading$ = this._loadingService.loading$;
  }
  
  ngOnInit(): void {
    this._router.events
      .pipe(
        tap((event) => {
          if (event instanceof RouteConfigLoadStart) {
            this._loadingService.loadingOn();
          } else if (event instanceof RouteConfigLoadEnd) {
            this._loadingService.loadingOff();
          }
        })
      )
      .subscribe();
  }
}


