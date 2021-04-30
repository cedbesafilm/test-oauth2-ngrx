import { InjectionToken } from '@angular/core';
import { environment } from '@env/environment';
import * as fromAuth from '@app/auth/reducers/auth.reducer';
import * as fromLayout from '@app/core/reducers/layout.reducer';
import * as fromRouter from '@ngrx/router-store';
import {
  Action,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

export interface State {
  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromLayout.layoutFeatureKey]: fromLayout.State;
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromAuth.authFeatureKey]: fromAuth.reducer,
    [fromLayout.layoutFeatureKey]: fromLayout.reducer,
    router: fromRouter.routerReducer,
  }),
});

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

/**
 * Auth Reducers
 */
export const selectAuthState = createFeatureSelector<State, fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  fromAuth.selectIsAuthenticated
);

export const selectUserData = createSelector(
  selectAuthState,
  fromAuth.selectUserData
);

/**
 * Layout Reducers
 */
export const selectLayoutState = createFeatureSelector<State, fromLayout.State>(
  fromLayout.layoutFeatureKey
);

export const selectIsHandset = createSelector(
  selectLayoutState,
  fromLayout.selectIsHandset
);

/**
 * Router Selectors
 */
export const selectRouter = createFeatureSelector<
  State,
  fromRouter.RouterReducerState<any>
>('router');

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = fromRouter.getSelectors(selectRouter);
