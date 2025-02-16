import { Component, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { VideoComponent, VideoStatus } from '../../../components/video/video.component';
import { IVideo, VideoType } from '../../../data/models/dtos';
import { selectAssets, selectVideos } from '../../../store/app.selectors';

@Component({
  selector: 'app-videos',
  imports: [
    VideoComponent
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent {
  mp4Video: IVideo = {
    cloudUrl: 'https://docs.material-tailwind.com/demo.mp4',
    sourceType: VideoType.Mp4
  };

  youtubeVideo: IVideo = {
    cloudUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    sourceType: VideoType.IFrame
  }

  readonly videos: Signal<IVideo[]>;

  constructor(private store: Store) {
    this.videos = this.store.selectSignal<IVideo[]>(selectVideos);
  }

  updateVideoStatus($event: VideoStatus) {
    console.log('update video status', $event);
  }
}
