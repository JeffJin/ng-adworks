import { Injectable } from '@angular/core';
import { IUser } from '../models/dtos';

@Injectable()
export class CacheService {

  constructor() {
  }

  getToken(): string {
    const token = localStorage.getItem('jtw');
    if (token) {
      return JSON.parse(token);
    }
    return '';
  }

  setToken(token: string): void {
    localStorage.setItem('jtw', JSON.stringify(token));
  }


  getUser(): any {
    try {
      const item = localStorage.getItem('user') || '';
      return JSON.parse(item);
    } catch (err) {
      return null;
    }
  }

  setUser(user: any): void {
    const dto: IUser = {
      userName: user.userName,
      email: user.email,
      phoneNumber: user.phoneNumber
    };
    const item = JSON.stringify(dto);
    localStorage.setItem('user', item);
  }

  setXsrfToken(token: any): void {
    localStorage.setItem('xsrf', token);
  }

  getXsrfToken(): any {
    return localStorage.getItem('xsrf');
  }
}
