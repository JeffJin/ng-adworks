import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CacheService } from './cache.service';
import { Router } from '@angular/router';
import { mockData } from './mock-data';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private cacheService: CacheService) {
  }

  login(email: string, password: string): Observable<any> {
    const dto = {email, password};
    return new Observable(observer => {
      if (environment.noBackend) {
        observer.next({...mockData.user, email, userName: email});
        observer.complete();
      } else {
        this.http.post(
          `${environment.apiBaseUrl}/account/login`,
          dto,
          {headers: new HttpHeaders({'Content-Type': 'application/json'})}
        ).subscribe((data: any) => {
          // store the result into local storage
          observer.next(data);
          observer.complete();
        }, (err) => {
          observer.error(err);
        });
      }
    });
  }

  register(userName: string, email: string, password: string, confirmPassword: string): Observable<any> {
    if (password !== confirmPassword) {
      return new Observable(obs => {
        obs.next({message: 'Passwords do not match', code: 'PasswordsNotMatch'});
        obs.complete();
      });
    }
    const formData: FormData = new FormData();
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('confirmPassword', confirmPassword);
    formData.append('password', password);
    return this.http.post(environment.apiBaseUrl + '/account/register', formData);
  }

  getUser(): Observable<any> {
    return new Observable(observer => {
      if (environment.noBackend) {
        observer.next(mockData.user);
        observer.complete();
      } else {
        this.http.get(environment.apiBaseUrl + '/user').subscribe((data: any) => {
          this.cacheService.setUser(data);
          observer.next(data);
          observer.complete();
        }, (err) => {
          // observer.error(err);
          return this.router.navigateByUrl('/login');
        });
      }


    });
  }

  initXsrfToken(): Observable<any> {
    const token = this.cacheService.getXsrfToken();
    if (token && token.tokenName) {
      return new Observable((obs) => {
        obs.next(token);
        obs.complete();
      });
    } else {
      return this.http.get(environment.apiBaseUrl + '/common/xsrf').pipe(tap({
        next: (data: any) => {
          // store the result into local storage
          this.cacheService.setXsrfToken(data);
        },
        error: (err) => {
          this.cacheService.setXsrfToken(null);
        }
      }));
    }
  }

  logout(): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/account/logout', null).pipe(tap({
      next: (data: any) => {
        // store the result into local storage
        this.cacheService.setToken(data);
        return data;
      },
      error: (err) => {
        return err;
      }
    }));
  }
}
