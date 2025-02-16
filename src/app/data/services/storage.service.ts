import { Injectable } from '@angular/core';
import { IUser } from '../models/dtos';

@Injectable({
    providedIn: 'root'
  }
)
export class StorageService {

  constructor() {
  }

  get(key: string): any {
    if (!localStorage) {
      return null;
    }
    return localStorage.getItem(key);
  }

  set(key: string, value: any) {
    if (localStorage) {
      localStorage.setItem(key, value);
    }
  }

  remove(key: string) {
    if (localStorage) {
      localStorage.removeItem(key);
    }
  }

  getToken(): string {
    if (!localStorage) {
      return '';
    }
    const token = localStorage.getItem('jtw');
    if (token) {
      return JSON.parse(token);
    }
    return '';
  }

  setToken(token: string): void {
    if (localStorage) {
      localStorage.setItem('jtw', JSON.stringify(token));
    }
  }

  setSavedState(state: any, localStorageKey: string) {
    if (!localStorage) {
      return;
    }
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    } catch (error) {
      console.error(error);
    }
  }

  getSavedState(localStorageKey: string): any {
    if (!localStorage) {
      return null;
    }
    try {
      const raw = localStorage.getItem(localStorageKey);
      if (raw != null) {
        return JSON.parse(raw);
      }
    } catch (err) {
      return null;
    }
    return null;
  }


  getUser(): any {
    if (!localStorage) {
      return null;
    }
    try {
      const item = localStorage.getItem('user') || '';
      return JSON.parse(item);
    } catch (err) {
      return null;
    }
  }

  setUser(user: any): void {
    if (!localStorage) {
      return;
    }
    const dto: IUser = {
      userName: user.userName,
      email: user.email,
      phoneNumber: user.phoneNumber
    };
    const item = JSON.stringify(dto);
    localStorage.setItem('user', item);
  }

  setXsrfToken(token: any): void {
    if (!localStorage) {
      return;
    }
    localStorage.setItem('xsrf', token);
  }

  getXsrfToken(): any {
    if (!localStorage) {
      return null;
    }
    return localStorage.getItem('xsrf');
  }
}
