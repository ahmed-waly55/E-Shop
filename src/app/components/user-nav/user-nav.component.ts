import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { UserDataService } from '../../core/service/user-data.service';

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
  constructor(private userData: UserDataService) {}
  items: MenuItem[] | undefined;
  logout: boolean = false;
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
  }

  getUserName(): void {
    this.userData.username.subscribe((next) => (this.userName = next));
  }
  getUserCartCount(): void {
    const id = localStorage.getItem('token') ?? '';
    this.userData
      .getCartCount(id)
      .subscribe((next) => (this.cartCount = next.cart.length));
  }
}
