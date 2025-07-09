import { Pipe, PipeTransform } from '@angular/core';
import { Iproducts } from '../interfaces/iproducts';

@Pipe({
  name: 'searchName',
  standalone: true
})
export class SearchNamePipe implements PipeTransform {

  transform(products: Iproducts[], searchKey: string): Iproducts[] {
    return products.filter((products) => products.title.toLowerCase().includes(searchKey.toLowerCase()))
  }

}
