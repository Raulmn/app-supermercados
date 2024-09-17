import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  #searchData = signal<string>('')

  public searchValue = computed(() => this.#searchData());

  constructor() { }

  setValue(value: string) {
    this.#searchData.set(value);
  }

}
