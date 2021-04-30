import { Injectable } from '@angular/core';
import { AuthActions } from '@app/auth/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  init$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.init),
        switchMap(() => this.oidcSecurityService.checkAuth())
      );
    },
    { dispatch: false }
  );

  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.login),
        tap(() => this.oidcSecurityService.authorize())
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.oidcSecurityService.logoff())
      );
    },
    { dispatch: false }
  );

  changedUserData$ = createEffect(() => {
    return this.oidcSecurityService.userData$.pipe(
      map((userData) => AuthActions.changedUserData({ userData: userData }))
    );
  });

  changedIsAuthenticated = createEffect(() => {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      map((isAuthenticated) =>
        isAuthenticated
          ? AuthActions.isAuthenticated()
          : AuthActions.isNotAuthenticated()
      )
    );
  });

  constructor(
    private actions$: Actions,
    private oidcSecurityService: OidcSecurityService
  ) {}
}
