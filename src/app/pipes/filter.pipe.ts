import { isNgTemplate } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';
import { Cars } from '../models/cars';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe<T extends object, U extends keyof T> implements PipeTransform {

  transform(items: T[], searchText: string, keys: U[]): T[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return keys.some(key => {
        return item[key].toString().toLowerCase().includes(searchText);
      });
    });
  }
 
}
