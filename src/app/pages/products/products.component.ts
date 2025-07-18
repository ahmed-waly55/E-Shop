import { Component } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CardComponent } from "../../shared/module/card/card/card.component";
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SearchNamePipe } from '../../core/pipes/search-name.pipe';
import { CartService } from '../../core/service/cart.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, InputIconModule, IconFieldModule, InputTextModule, FormsModule, SearchNamePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(private _ProductService: ProductService, private _cartService: CartService) { }
  allProduct: Iproducts[] = []
  searchKey: string = ''

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct(): void {

    this._ProductService.allProduct().subscribe((response: any) => {
      this.allProduct = response.products.map((product: Iproducts) => {
        return {
          ...product,
          isAddedToCart: this._cartService.isAddedToCart(product) || false
        }
      });
    })
  }
}

