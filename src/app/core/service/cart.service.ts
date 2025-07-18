import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';
import { Iproducts } from '../interfaces/iproducts';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private __httpClient: HttpClient, private _notificationsService: NotificationsService) { }


  countOfCart: BehaviorSubject<number> = new BehaviorSubject(
    (
      JSON.parse(localStorage.getItem('cartState') ?? '[]') as Iproducts[]
    ).length
  );

  addToCart(product: Iproducts) {
    const storedCart = localStorage.getItem('cartState');
    const cart: Iproducts[] = storedCart ? JSON.parse(storedCart) : [];

    if (!product.isAddedToCart) {
      product.isAddedToCart = true;
      cart.push(product);
      localStorage.setItem('cartState', JSON.stringify(cart));
      this._notificationsService.showSuccess('Success', 'Item added to cart');
      this.countOfCart.next(cart.length);
    } else {
      this._notificationsService.showInfo('Info', 'is item is added');
    }
  }

  isAddedToCart(product: Iproducts): boolean {
    const storedCart = localStorage.getItem('cartState');
    const cartState = storedCart ? JSON.parse(storedCart) : [];
    const isAdded = cartState.some((item: Iproducts) => item.id === product.id);
    return isAdded;
  }
}
