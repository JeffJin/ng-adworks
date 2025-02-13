import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../../data/services/auth.service';
import { CacheService } from '../../data/services/cache.service';
import { authApiActions } from '../actions/auth.actions';
import { loginFormActions, LoginFormErrorType } from '../actions/login-form.actions';


@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authApiActions.login),
      exhaustMap(action =>
        this.authService.login(action.userName, action.password).pipe(
          map(user => {
            this.cacheService.setUser(user);
            this.cacheService.setToken(user.token);
            return authApiActions.loginSuccess({ user });
          }),
          catchError((error) => {
            console.error(error);
            return of(loginFormActions.loginFailure({
              type: LoginFormErrorType.Server,
              message: 'The email or password is incorrect.'
            }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private cacheService: CacheService,
  ) {
  }
}
