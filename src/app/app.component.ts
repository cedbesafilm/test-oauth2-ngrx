import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthActions } from '@app/auth/actions';
import * as fromRoot from '@app/core/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title: string = "TEST"
  isHandset$: Observable<boolean>;
  isAuthenticated$: Observable<boolean>;
  userData$: Observable<any>;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.isHandset$ = this.store.select(fromRoot.selectIsHandset);
    this.isAuthenticated$ = this.store.select(fromRoot.selectIsAuthenticated);
    this.userData$ = this.store.select(fromRoot.selectUserData);
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.init());
  }

  login(): void {
    this.store.dispatch(AuthActions.login());
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
