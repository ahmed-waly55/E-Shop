import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { UserDataService } from '../../core/service/user-data.service';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../core/service/cart.service';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
  ],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserNavComponent implements OnInit {
  constructor(
    private userData: UserDataService,
    private _cartService: CartService,
    private _auth: AuthService,
    private _router: Router
  ) { }
  items: MenuItem[] | undefined;
  logOut: boolean = false;
  userName: string = '';
  cartCount: number = 0;
  ngOnInit() {
    this.getUserName();
    this.getUserCartCount();
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        path: 'home',
      },
      {
        label: 'products',
        icon: 'pi pi-sparkles',
        path: 'products',
      },
      {
        label: 'category',
        icon: 'pi pi-th-large',
        path: 'category',
      },
    ];
    this._cartService.countOfCart.subscribe((next) => {
      this.cartCount = next

    })
  }

  getUserName(): void {
    this.userData.username.subscribe((next) => (this.userName = next));
  }
  getUserCartCount(): void {
    const id = localStorage.getItem('token') ?? '';
    this._cartService
      .getCartCount(id)
      .subscribe((next) => (this.cartCount = next.cart.length));
  }

  logout(): void {
    this._auth.logout().subscribe((next) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this._router.navigate(['auth']);
    });
  }
}
