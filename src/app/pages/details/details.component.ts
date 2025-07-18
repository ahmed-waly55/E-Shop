import { Component } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Iproducts } from '../../core/interfaces/iproducts';
import { Button } from "primeng/button";
import { CartService } from '../../core/service/cart.service';
import { NotificationsService } from '../../core/service/notifications.service';
import { Title } from '@angular/platform-browser'; //  Import Title service

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [Button, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  id: string = '';
  isAddedToCart: boolean = false;
  productDetails!: Iproducts;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _notificationsService: NotificationsService,
    private _titleService: Title //  Inject Title service
  ) { }

  ngOnInit() {
    // Get the product ID from the route parameters
    this._activatedRoute.paramMap.subscribe((next: any) => {
      this.id = next.params['id'];
    });

    // Display product details
    this.displayDetails();
  }

  displayDetails(): void {
    this._activatedRoute.data.subscribe((data: any) => {
      // Set product details and check if it's added to cart
      this.productDetails = {
        ...data.details.product,
        isAddedToCart: this._CartService.isAddedToCart(data.details.product)
      };

      //  Set the browser tab title to the product title
      this._titleService.setTitle(this.productDetails.title || 'Product Details');
    });
  }

  addToCart(product: Iproducts) {
    // Add the product to the cart
    this._CartService.addToCart(product);
  }
}
