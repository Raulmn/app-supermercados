import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

import { SearchService } from '@commons';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {

  private searchService = inject( SearchService );
  private searchDestroy$ = new Subject<void>();
  
  public searchForm = new FormGroup({
    searchValue: new FormControl<string>('')
  });
  
  
  ngOnInit(): void {
    this.searchForm.valueChanges
    .pipe(
      debounceTime(300),
      takeUntil(this.searchDestroy$)
    )
    .subscribe( (value) => {
      console.log('valueChanges: ', value.searchValue)
      this.searchService.setValue(JSON.parse(JSON.stringify(value.searchValue)));
    });
  }
  
  ngOnDestroy(): void {
    this.searchDestroy$.unsubscribe();
  }

}
