import { on } from '@ngrx/store';
import { createImmerReducer, immerOn } from 'ngrx-immer/store';
import { loginFormActions, LoginFormState, LoginFormStatus } from '../actions/login-form.actions';

export const loginFormKey = 'loginForm';

export const initialState: LoginFormState = {
  userName: '',
  password: '',
  status: LoginFormStatus.None,
  errors: [],
};

export const loginFormReducer = createImmerReducer(
  initialState,
  immerOn(loginFormActions.submitForm, (draft) => {
      draft.status = LoginFormStatus.Submitting;
      draft.errors = [];
    }
  ),
  immerOn(loginFormActions.loginFailure, (draft, { error }) => {
      const index = draft.errors.findIndex(err => err.type === error.type);
      if (index > -1) {
        draft.errors[index] = error;
      } else {
        draft.errors.push(error);
      }
    }
  ),
  on(loginFormActions.resetLoginForm, () => {
      return initialState;
    }
  ),
  immerOn(loginFormActions.updateStatus, (state, { status }) => {
      state.status = status;
    }
  ),
  immerOn(loginFormActions.updatePassword, (state, { payload }) => {
      state.password = payload;
    }
  ),
  immerOn(loginFormActions.updateUserName, (state, { payload }) => {
      state.userName = payload;
    }
  ),
);

