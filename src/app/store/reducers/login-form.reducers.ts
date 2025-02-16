import { on } from '@ngrx/store';
import { createImmerReducer, immerOn } from 'ngrx-immer/store';
import { LoginFormActions, LoginFormState, LoginFormStatus } from '../actions/login-form.actions';

export const loginFormKey = 'loginForm';

export const initialState: LoginFormState = {
  email: '',
  password: '',
  rememberMe: false,
  status: LoginFormStatus.None,
  errors: [],
};

export const loginFormReducer = createImmerReducer(
  initialState,
  immerOn(LoginFormActions.submitForm, (draft) => {
      draft.status = LoginFormStatus.Submitting;
      draft.errors = [];
    }
  ),
  immerOn(LoginFormActions.loginFailure, (draft, { error }) => {
      const index = draft.errors.findIndex(err => err.type === error.type);
      if (index > -1) {
        draft.errors[index] = error;
      } else {
        draft.errors.push(error);
      }
      if(draft.errors.length > 0) {
        draft.status = LoginFormStatus.Failure;
      }
    }
  ),
  on(LoginFormActions.resetLoginForm, () => {
      return initialState;
    }
  ),
  immerOn(LoginFormActions.updateStatus, (state, { status }) => {
      state.status = status;
    }
  ),
  immerOn(LoginFormActions.updatePassword, (state, { payload }) => {
      state.password = payload;
    }
  ),
  immerOn(LoginFormActions.updateRememberMe, (state, { payload }) => {
      state.rememberMe = payload;
    }
  ),
  immerOn(LoginFormActions.updateEmail, (state, { payload }) => {
      state.email = payload;
    }
  ),
);

