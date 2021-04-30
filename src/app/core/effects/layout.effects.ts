import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { LayoutActions } from '@app/core/actions';
import { Actions, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';

@Injectable()
export class LayoutEffects {
  breakpointChanged$ = createEffect(() => {
    return this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        map((result) =>
          result.matches
            ? LayoutActions.changedToHandset()
            : LayoutActions.changedToWeb()
        )
      );
  });

  constructor(
    private actions$: Actions,
    private breakpointObserver: BreakpointObserver
  ) {}
}
