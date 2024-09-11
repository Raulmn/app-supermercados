import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, TitleStrategy } from '@angular/router';


import { routes } from './app.routes';
import { httpInterceptor, PageTitleStrategyService } from '@commons';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {provide: TitleStrategy, useClass: PageTitleStrategyService},
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([httpInterceptor])) // HttpClientModule -> Deprecated
  ]
};
