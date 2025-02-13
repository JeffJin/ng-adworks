import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginFormState } from './actions/login-form.actions';
import { AssetState, AuthState } from './app.state';
import { assetsKey } from './reducers/assets.reducers';
import { authKey } from './reducers/auth.reducers';
import { loginFormKey } from './reducers/login-form.reducers';

export const selectAuth =  createFeatureSelector<AuthState>(authKey);

export const selectUser = createSelector(
  selectAuth,
  auth => auth.user,
);

export const selectAssets = createFeatureSelector<AssetState>(assetsKey);

export const selectImages = createSelector(
  selectAssets,
  (state: AssetState) => state.images,
);

export const selectVideos =  createSelector(
  selectAssets,
  (state: AssetState) => state.videos,
);

export const selectAudios =  createSelector(
  selectAssets,
  (state: AssetState) => state.audios,
);

export const selectLoginForm = createFeatureSelector<LoginFormState>(loginFormKey);

