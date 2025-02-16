import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../data/services/auth.service';

@Injectable({providedIn: 'root'})
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.authService.isEmailTaken(control.value).pipe(
      map((isTaken) => (isTaken ? {uniqueEmail: true} : null)),
      catchError(() => of(null)),
    );
  }
}
