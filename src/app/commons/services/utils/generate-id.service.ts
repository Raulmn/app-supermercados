import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateIdService {

  constructor() { }

  /**
   * Generate Random ID only for Developer Mode using JSON SERVER
   */
  getRandomId(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
  }

}
