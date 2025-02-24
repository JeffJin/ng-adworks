import { IAudio, IImage, IUser, IVideo } from '../data/models/dtos';
import { LoginFormState } from './actions/login-form.actions';
import { DashboardState } from './reducers/dashboard.reducers';

export interface AssetState {
  images: IImage[];
  videos: IVideo[];
  audios: IAudio[];
}

export interface AuthState {
  user: IUser|null;
  error: string;
}

export interface AppState {
  auth: AuthState;
  assets: AssetState;
  dashboard: DashboardState;
  loginForm: LoginFormState;
}
