import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductService } from '../service/product.service';
import { EMPTY, Observable } from 'rxjs';

export const myDetailsResolver: ResolveFn<Observable<any>> = (route, state) => {
  const id = route.paramMap.get("id")
  const product = inject(ProductService)
  return id ? product.getDetails(id) : EMPTY;
};
