import { LayoutActions } from '@app/core/actions';
import { createReducer, on } from '@ngrx/store';

export const layoutFeatureKey = 'layout';

export interface State {
  isHandset: boolean;
}

export const initialState: State = {
  isHandset: false,
};

export const reducer = createReducer(
  initialState,
  on(LayoutActions.changedToHandset, (state) => ({
    ...state,
    isHandset: true,
  })),
  on(LayoutActions.changedToWeb, (state) => ({
    ...state,
    isHandset: false,
  }))
);

export const selectIsHandset = (state: State) => state.isHandset;
