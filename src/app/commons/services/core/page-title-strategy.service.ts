import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';
import packageJson from './../../../../../package.json';

@Injectable({
  providedIn: 'root'
})
export class PageTitleStrategyService extends TitleStrategy {


  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title) {
      this.title.setTitle(`${title} | ${packageJson.displayName}`);
      
    }
  }

}
