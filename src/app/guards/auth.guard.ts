import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../store/app.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const isLoggedIn = store.selectSignal(selectIsLoggedIn);
  if (isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
