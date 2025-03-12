import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = () => {
  const _router = inject(Router);

    // using typeof window !== 'undefined fix bug navigate to login 
  if (typeof window !== 'undefined' && localStorage.getItem("token") !== null) {
    return true;
  } else {
    _router.navigate(['auth/login']);
    return false;
  }
};
