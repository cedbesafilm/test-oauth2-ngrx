import { createAction, props } from '@ngrx/store';

export const init = createAction('[Auth] Init');

export const isAuthenticated = createAction('[Auth] Is Authenticated');

export const isNotAuthenticated = createAction('[Auth] Is Not Authenticated');

export const login = createAction('[Auth] Login');

export const logout = createAction('[Auth] Logout');

export const changedUserData = createAction(
  '[Auth] Changed User Data',
  props<{ userData: any }>()
);
