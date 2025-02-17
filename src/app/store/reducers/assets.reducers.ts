import { on } from '@ngrx/store';
import { createImmerReducer, immerOn } from 'ngrx-immer/store';
import { IImage } from '../../data/models/dtos';
import { AudioActions, ImageActions, VideoActions } from '../actions/assets.actions';
import { AssetState } from '../app.state';

export const assetsKey = 'assets';

export const initialState: AssetState = {
  images: [],
  videos: [],
  audios: [],
};

export const assetsReducer = createImmerReducer(
  initialState,
  on(VideoActions.loadVideosSuccess, (state, { videos }) =>
    ({ ...state, videos })
  ),
  on(AudioActions.loadAudiosSuccess, (state, { audios }) =>
    ({ ...state, audios })
  ),
  on(ImageActions.loadImagesSuccess, (state, { images }) =>
    ({ ...state, images })
  ),
  on(ImageActions.addImageSuccess, (state, { image }) => {
    if (state.images.find((i: IImage) => i.id === image.id)) {
      return state;
    }
    return { ...state, images: [ ...state.images, image ] };
  }),
  immerOn(ImageActions.updateImageSizeSuccess, (state, { image }) => {
    const index = state.images.findIndex(img => img.id == image.id);
    state.images[index].width = image.width;
    state.images[index].height = image.height;
  }),
  immerOn(ImageActions.updateImageSuccess, (state, { image }) => {
    const index = state.images.findIndex(img => img.id == image.id);
    if (index !== -1) {
      state.images[index].description = image.description;
      state.images[index].title = image.title;
      state.images[index].category = image.category;
      state.images[index].tags = image.tags;
      state.images[index].updatedBy = image.updatedBy;
      state.images[index].cloudUrl = image.cloudUrl;
      state.images[index].updatedOn = new Date();
    }
  }),
  immerOn(ImageActions.removeImageSuccess, (state, { id }) => {
    const index = state.images.findIndex(img => img.id == id);
    if (index !== -1) {
      state.images.splice(index, 1);
    }
  })
);
