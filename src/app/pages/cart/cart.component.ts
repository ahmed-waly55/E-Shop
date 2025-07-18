import { Component } from '@angular/core';
import { Iproducts } from '../../core/interfaces/iproducts';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DataViewModule, ButtonModule, TagModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  allCartProduct: Iproducts[] = []
  ngOnInit(): void {
    if (localStorage.getItem("cartState") !== null) {
      this.allCartProduct = JSON.parse(localStorage.getItem("cartState") || '')
    }
  }
  clearCart() {
    localStorage.removeItem("cartState")
    this.allCartProduct = []
  }
}
