import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { VideoComponent, VideoStatus } from '../../../components/video/video.component';
import { IVideo } from '../../../data/models/dtos';
import { VideoActions } from '../../../store/actions/assets.actions';
import { selectVideos } from '../../../store/app.selectors';

@Component({
  selector: 'app-videos',
  imports: [
    VideoComponent
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent implements OnInit {
  readonly videos: Signal<IVideo[]>;

  constructor(private store: Store) {
    this.videos = this.store.selectSignal<IVideo[]>(selectVideos);
  }

  ngOnInit() {
    this.store.dispatch(VideoActions.loadVideos());
  }

  updateVideoStatus($event: VideoStatus) {
    console.log('update video status', $event);
  }
}
