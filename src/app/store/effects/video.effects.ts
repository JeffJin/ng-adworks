import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { IVideo } from '../../data/models/dtos';
import { VideoService } from '../../data/services/video.service';
import { loadVideos, loadVideosFailure, loadVideosSuccess } from '../actions/assets.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class VideoEffects {

  loadVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVideos),
      mergeMap(() => this.videoService.getVideos()
        .pipe(
          map(videos => {
            const results = videos.map((v: IVideo) => {
              v.checked = false;
              v.assetType = 'Video';
              return v;
            });
            return loadVideosSuccess({ videos: results });
          }),
          catchError((error) => of(loadVideosFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private videoService: VideoService
  ) {
  }
}
