import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, OperatorFunction, tap } from 'rxjs';
import {CacheService} from './cache.service';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {EntityDto} from '../models/dtos';

@Injectable()
export class TokenInterceptor  implements HttpInterceptor {

  constructor(public cacheSvc: CacheService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cacheSvc.getToken();
    const headers = {
      Authorization: ''
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    request = request.clone({
      setHeaders: headers
    });

    // if the request is POST or PUT, add auditing data into the payload
    if (request.method === 'POST'){
      this.updateCreatedBy(request);
    }
    if (request.method === 'PUT'){
      this.updateUpdatedBy(request);
    }
    //TODO show progress bar

    return next.handle(request).pipe(tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          //TODO hide progress bar
        }
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          //TODO hide progress bar
          console.error(err);
          if (err.status === 401) {
            // TODO fire an logout action from redux
            this.router.navigateByUrl('error/401');
          } else {
            return err;
          }
        }
      }})
    );
  }

  updateUpdatedBy(request: HttpRequest<EntityDto>): void{
    if (request.body){
      request.body.createdBy = request.body.createdBy || '';
      request.body.updatedBy = this.cacheSvc.getUser() ? this.cacheSvc.getUser().email : '';
      request.body.createdOn = null;
      request.body.updatedOn = new Date();
    }
  }

  updateCreatedBy(request: HttpRequest<EntityDto>): void{
    if (request.body){
      request.body.createdBy = this.cacheSvc.getUser() ? this.cacheSvc.getUser().email : '';
      request.body.updatedBy = '';
      request.body.updatedOn = null;
      request.body.createdOn = new Date();
    }
  }

}
