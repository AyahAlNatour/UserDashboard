import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersFailure, loadUser, loadUserSuccess, loadUserFailure } from './user.actions';

export interface UserState {
  users: any[];
  user: any;
  error: any;
  loading: boolean;
}

export const initialState: UserState = {
  users: [],
  user: null,
  error: null,
  loading: false
};

const _userReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(loadUser, state => ({ ...state, loading: true })),
  on(loadUserSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(loadUserFailure, (state, { error }) => ({ ...state, error, loading: false }))
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}
