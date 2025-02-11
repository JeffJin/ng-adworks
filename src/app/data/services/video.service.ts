import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import {VideoDto} from '../models/dtos';
import {environment} from '../../environments/environment';
import {mockData} from "./mock-data";

@Injectable()
export class VideoService {


  constructor(private httpClient: HttpClient) { }

  getVideo(id: string): Observable<any> {
    if (environment.noBackend) {
      return new Observable(observer => {
        observer.next(mockData.videos.find(item => item.id === id ));
        observer.complete();
      });
    }
    return this.httpClient.get(`${environment.apiBaseUrl}/videos/${id}`);
  }

  getVideos(pageIndex: number = 0, pageSize: number = 12, isPrivate: boolean = false): Observable<any> {
    if (environment.noBackend) {
      return new Observable(observer => {
        observer.next(mockData.videos);
        observer.complete();
      });
    }
    return this.httpClient.get(`${environment.apiBaseUrl}/videos`);
  }

  getThumbnails(id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}/videos/thumbnails/${id}`);
  }

  getCategories(): Observable<any> {
    if (environment.noBackend) {
      return new Observable(observer => {
        observer.next(mockData.categories);
        observer.complete();
      });
    }
    return this.httpClient.get(`${environment.apiBaseUrl}/common/categories`);
  }

  updateVideo(id: string, videoDto: VideoDto): Observable<any> {
    return this.httpClient.put(`${environment.apiBaseUrl}/videos/${id}`, videoDto);
  }

  deleteVideo(id: string) {
    return this.httpClient.delete(`${environment.apiBaseUrl}/videos/${id}`);
  }

}
