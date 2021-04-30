import { APP_INITIALIZER, NgModule } from '@angular/core';
import { environment } from '@env/environment';
import { AuthModule, OidcConfigService } from 'angular-auth-oidc-client';

export function configureAuth(
  oidcConfigService: OidcConfigService
): () => Promise<any> {
  return () =>
    oidcConfigService.withConfig({
      stsServer: environment.stsServer,
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: 'frontend_service',
      scope: 'openid profile offline_access email roles',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      ignoreNonceAfterRefresh: true,
      renewTimeBeforeTokenExpiresInSeconds: 30,
      eagerLoadAuthWellKnownEndpoints: false,
      secureRoutes: [environment.apiServer],
    });
}

@NgModule({
  imports: [AuthModule.forRoot()],
  exports: [AuthModule],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    },
  ],
})
export class AuthConfigModule {}
