import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  username: BehaviorSubject<string>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const isBrowser = isPlatformBrowser(this.platformId);
    const name = isBrowser ? localStorage.getItem('username') : '';
    this.username = new BehaviorSubject<string>(name || '');
  }
}
