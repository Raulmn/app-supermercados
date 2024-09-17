import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filterValue: string): any[] {
    if (!items || !filterValue) return items;
    
    return items.filter( item => { 
      return item.name.toLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1;
    });

  }

}
