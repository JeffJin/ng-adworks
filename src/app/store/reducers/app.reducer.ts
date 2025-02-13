import {
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { IUser } from '../../data/models/dtos';
import { AppState } from '../app.state';
import { environment } from '../../../environments/environment';

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [ logger ]
  : [];
