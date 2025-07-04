import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Iproducts } from '../../../../core/interfaces/iproducts';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/service/cart.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, ButtonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  constructor(private _CartService: CartService) { }
  isAddedToCart: boolean = false
  @Input({ required: true }) isSmallCard: boolean = false;
  @Input({ required: true }) Products!: Iproducts[]


  addToCart(productId: string) {
    const userId = localStorage.getItem("token") ?? ''
    this._CartService.addToCart({ userId, productId }).subscribe((next) => {
      console.log(next);
      this.isAddedToCart = true
    })
  }


}
