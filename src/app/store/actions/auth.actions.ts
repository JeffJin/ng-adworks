import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../../data/models/dtos';



export const authApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    // defining events with payload using the `props` function
    'Login': props<{ userName: string, password: string }>(),
    'Login Success': props<{ user: IUser }>(),
    // defining an event without payload using the `emptyProps` function
    'Logout Success': emptyProps(),
    'Set Token': props<{ token: string }>(),
  },
});
