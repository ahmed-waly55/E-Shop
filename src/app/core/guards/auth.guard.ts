import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const _router = inject(Router);
  const auth = inject(AuthService);

  // using typeof window !== 'undefined fix bug navigate to login
  if (typeof window !== 'undefined' && auth.authorized()) {
    return true;
  } else {
    _router.navigate(['auth/login']);
    return false;
  }
};
