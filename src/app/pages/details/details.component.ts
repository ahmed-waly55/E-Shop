import { Component } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Iproducts } from '../../core/interfaces/iproducts';
import { Button } from "primeng/button";
import { CartService } from '../../core/service/cart.service';
import { NotificationsService } from '../../core/service/notifications.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [Button, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  id: string = ''
  isAddedToCart: boolean = false
  productDetails: Iproducts = {} as Iproducts
  constructor(private _activatedRoute: ActivatedRoute, private _CartService: CartService, private _notificationsService: NotificationsService) { }
  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((next: any) => { this.id = next.params['id'] })
    this.displayDetails()
  }
  displayDetails(): void {
    // const id = ''
    // console.log(this.id)
    this._activatedRoute.data.subscribe((data: any) => {
      // console.log(data);
      this.productDetails = data.details.product

    })
  }
  addToCart(productId: string) {
    const userId = localStorage.getItem("token") ?? ''
    this._CartService.addToCart({ userId, productId }).subscribe((next) => {
      this._CartService.countOfCart.next(next.cart.length)
      this.isAddedToCart = true
      const stordCard = localStorage.getItem('cartState')
      const cartState = stordCard ? JSON.parse(stordCard) : {}
      cartState[productId] = true
      this._notificationsService.showSuccess("succes", next.message)
      localStorage.setItem("cartState", JSON.stringify(cartState))
    })
  }

}
