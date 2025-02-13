import { Action, createReducer, on } from '@ngrx/store';
import { authApiActions } from '../actions/auth.actions';
import { AuthState } from '../app.state';

export const authKey = 'auth';

export const initialState: AuthState = {
  user: null,
  token: '',
  error: '',
};

export const authReducer = createReducer(
  initialState,
  on(authApiActions.loginSuccess, (state, { user }) =>
    ({ ...state, user })
  ),
  on(authApiActions.logoutSuccess, (state, { }) =>
    (initialState)
  ),
);

