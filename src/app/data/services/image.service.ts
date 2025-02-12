import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import {ImageDto} from '../models/dtos';
import {environment} from '../../../environments/environment';
import {mockData} from './mock-data';

@Injectable()
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  getImages(pageIndex: number = 0, pageSize: number = 12, isPrivate: boolean = false): Observable<any> {
    if (environment.noBackend) {
      return new Observable(observer => {
        observer.next(mockData.images);
        observer.complete();
      });
    }
    return this.httpClient.get(`${environment.apiBaseUrl}/images`);
  }

  getImage(id: string): Observable<any> {
    if (environment.noBackend) {
      return new Observable(observer => {
        observer.next(mockData.images.find(item => item.id === id ));
        observer.complete();
      });
    }
    return this.httpClient.get(`${environment.apiBaseUrl}/images/${id}`);
  }

  updateImage(id: string, imageDto: ImageDto): Observable<any> {
    return this.httpClient.put(`${environment.apiBaseUrl}/images/${id}`, imageDto);
  }

  deleteImage(id: string): Observable<any>  {
    return this.httpClient.delete(`${environment.apiBaseUrl}/images/${id}`);
  }

}
