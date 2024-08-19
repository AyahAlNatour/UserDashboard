import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure, loadUser, loadUserSuccess, loadUserFailure } from './user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    mergeMap(() => this.userService.getUsers()
      .pipe(
        map(users => loadUsersSuccess({ users })),
        catchError(error => of(loadUsersFailure({ error })))
      )
    )
  ));

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(loadUser),
    mergeMap(action => this.userService.getUser(action.id)
      .pipe(
        map(user => loadUserSuccess({ user })),
        catchError(error => of(loadUserFailure({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
