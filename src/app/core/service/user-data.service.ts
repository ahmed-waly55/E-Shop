import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  username: BehaviorSubject<string>;

  constructor(
    private _httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const storedUsername =
      isPlatformBrowser(this.platformId) && localStorage.getItem('username')
        ? localStorage.getItem('username')!
        : '';
    this.username = new BehaviorSubject<string>(storedUsername);
  }

  getCartCount(id: string): Observable<any> {
    return this._httpClient.get(
      `https://e-commerce-serverside.vercel.app/my-cart/${id}`
    );
  }
}
