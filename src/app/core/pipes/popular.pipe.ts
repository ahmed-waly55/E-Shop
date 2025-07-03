import { Pipe, PipeTransform } from '@angular/core';
import { Iproducts } from '../interfaces/iproducts';

@Pipe({
  name: 'popular',
  standalone: true
})
export class PopularPipe implements PipeTransform {

  transform(products: Iproducts[]): Iproducts[] {
    return products?.filter((product) => product?.popular === true);
  }

}
