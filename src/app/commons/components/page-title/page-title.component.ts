import { ChangeDetectionStrategy, Component, computed, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, TitleStrategy } from '@angular/router';
import { PageTitleStrategyService } from '@commons';
import { delay, filter } from 'rxjs';

@Component({
  selector: 'app-page-title',
  standalone: true,
  template: `<h6 class="p-1">{{ titlePage }}</h6>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTitleComponent implements OnInit { 

  private router = inject(Router);
  
  public titlePage: string = '';

  constructor(private title: Title, private cf: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.router.events
    .pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      delay(1)
    )
    .subscribe((value) => {
      this.titlePage = this.title.getTitle().split('|')[0];
        this.cf.detectChanges();
    })
  }

}
