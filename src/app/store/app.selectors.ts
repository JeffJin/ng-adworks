import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginFormState, LoginFormStatus } from './actions/login-form.actions';
import { AssetState, AuthState } from './app.state';
import { assetsKey } from './reducers/assets.reducers';
import { authKey } from './reducers/auth.reducers';
import { dashboardKey, DashboardState } from './reducers/dashboard.reducers';
import { loginFormKey } from './reducers/login-form.reducers';

export const selectAuth =  createFeatureSelector<AuthState>(authKey);

export const selectUser = createSelector(
  selectAuth,
  auth => auth.user,
);

export const selectIsLoggedIn = createSelector(
  selectAuth,
  auth => auth.user !== null && !!auth.user.token && auth.user.token.length > 0,
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

export const selectDashboard = createFeatureSelector<DashboardState>(dashboardKey);

export const selectLoginForm = createFeatureSelector<LoginFormState>(loginFormKey);

export const selectLoginFormStatus = createSelector(
  selectLoginForm,
  (state: LoginFormState) => state.status,
)

export const selectLoginFormEmail = createSelector(
  selectLoginForm,
  (state: LoginFormState) => state.email,
)

export const selectLoginFormPassword = createSelector(
  selectLoginForm,
  (state: LoginFormState) => state.password,
)

export const selectDashboardSideMenuHidden = createSelector(
  selectDashboard,
  (state: DashboardState) => !state.sideMenuShown,
)
