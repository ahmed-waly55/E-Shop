import { Component, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CardComponent } from "../../shared/module/card/card/card.component";
import { Iproducts } from '../../core/interfaces/iproducts';
import { PopularPipe } from '../../core/pipes/popular.pipe';
import { ProductService } from '../../core/service/product.service';
import { CartService } from '../../core/service/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleriaModule, CardComponent, PopularPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private _productService: ProductService, private _cartService: CartService) {

  }
  images: any[] | undefined;
  smallProducts!: Iproducts[];
  bestProducts!: Iproducts[];

  ngOnInit() {
    this.images = [
      {
        itemImageSrc:
          'https://img.freepik.com/free-photo/big-sale-discounts-products_23-2150336669.jpg',
        alt: 'Description for product 1',
        title: 'product 1',
      },
      {
        itemImageSrc:
          'https://img.freepik.com/premium-psd/smart-phone-sale-promotion-black-friday-sale-web-banner-template_179771-192.jpg',
        alt: 'Description for product 2',
        title: 'product 2',
      },
      {
        itemImageSrc:
          'https://img.freepik.com/premium-psd/gaming-laptop-sale-promotion-banner_252779-743.jpg',
        alt: 'Description for product 3',
        title: 'product 3',
      },
    ];
    this.getAllProduct()
  }

  getAllProduct(): void {
    this._productService.allProduct().subscribe((response: any) => {
      this.smallProducts = response.products.slice(0, 4);
      this.bestProducts = response.products.map((product: Iproducts) => {
        return {
          ...product,
          isAddedToCart: this._cartService.isAddedToCart(product) || false,
        };
      });
    });
  }


}
