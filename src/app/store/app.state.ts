import { IAudio, IImage, IUser, IVideo } from '../data/models/dtos';

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
}
