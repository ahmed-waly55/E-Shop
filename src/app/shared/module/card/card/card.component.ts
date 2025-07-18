import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Iproducts } from '../../../../core/interfaces/iproducts';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/service/cart.service';
import { NotificationsService } from '../../../../core/service/notifications.service';
import { EmptyComponent } from "../../../empty/empty.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, ButtonModule, RouterLink, EmptyComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  constructor(private _CartService: CartService) { }
  isAddedToCart: boolean = false
  @Input({ required: true }) isSmallCard: boolean = false;
  @Input({ required: true }) Products!: Iproducts[]
  @Input() searchKey: string = ''


  addToCart(product: Iproducts) {
    this._CartService.addToCart(product)
  }


}
