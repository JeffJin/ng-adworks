import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../../data/models/dtos';

export enum LoginFormStatus {
  Typing = 'typing',
  Submitting = 'submitting',
  Success = 'success',
  Failure = 'failure',
  None = '',
}
export enum LoginFormErrorType {
  UserName = 'UserName',
  Password = 'Password',
  Server = 'Server',
  Timeout = 'Timeout',
}
export interface LoginFormError {
  type: LoginFormErrorType;
  message: string;
}
export interface LoginFormState {
  userName: string;
  password: string;
  status: LoginFormStatus;
  errors: LoginFormError[];
}

export const loginFormActions = createActionGroup({
  source: 'Login Form',
  events: {
    // defining events with payload using the `props` function
    'Submit Form': emptyProps(),
    'Reset Login Form': emptyProps(),
    'Update Status': props<{ status: LoginFormStatus }>(),
    'Update Error': props<{ error: LoginFormError }>(),
    'Update UserName': props<{ payload: string }>(),
    'Update Password': props<{ payload: string }>(),
    // defining an event with payload using the props factory
    'Login Failure':(error: LoginFormError) => ({ error }),
  },
});
