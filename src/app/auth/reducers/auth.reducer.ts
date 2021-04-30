import { AuthActions } from '@app/auth/actions';
import { createReducer, on } from '@ngrx/store';

export const authFeatureKey = 'auth';

export interface State {
  isAuthenticated: boolean;
  userData: any;
}

export const initialState: State = {
  isAuthenticated: false,
  userData: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.isAuthenticated, (state) => ({
    ...state,
    isAuthenticated: true,
  })),
  on(AuthActions.isNotAuthenticated, (state) => ({
    ...state,
    isAuthenticated: false,
    userData: null,
  })),
  on(AuthActions.changedUserData, (state, { userData }) => ({
    ...state,
    userData: userData,
    roles: userData?.resource_access?.frontend_service?.roles || [],
  }))
);

export const selectIsAuthenticated = (state: State) => state.isAuthenticated;

export const selectUserData = (state: State) => state.userData;
