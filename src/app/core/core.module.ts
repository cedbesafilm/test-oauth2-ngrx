import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { environment } from '@env/environment';
import { AuthConfigModule } from '@app/auth';
import { AuthEffects } from '@app/auth/effects/';
import { LayoutEffects } from '@app/core/effects';
import { metaReducers, ROOT_REDUCERS } from '@app/core/reducers';
import { SharedModule } from '@app/shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthInterceptor } from 'angular-auth-oidc-client';
import { SidenavComponent, ToolbarComponent } from '@app/core/components';

@NgModule({
  declarations: [ToolbarComponent, SidenavComponent],
  imports: [
    AuthConfigModule,
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      name: 'Store',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AuthEffects, LayoutEffects]),
    StoreRouterConnectingModule.forRoot(),
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [ToolbarComponent, SidenavComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
