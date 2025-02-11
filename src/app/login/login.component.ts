import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { UserDto } from '../data/models/dtos';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: UntypedFormGroup;
  user$: Observable<UserDto> | null = null;

  userName = new UntypedFormControl('', [
    Validators.required
  ]);
  password = new UntypedFormControl('', [
    Validators.required
  ]);

  constructor(public fb: UntypedFormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
    // this.user$ = this.store.select(selectUser);
  }


  ngOnInit(): void {

  }

  loginToSite() {
    const userName = this.loginForm!.value.email;
    const password = this.loginForm!.value.password;
    this.user$?.subscribe(user => {
      if (user && user.userName && user.token) {
        this.router.navigateByUrl('dashboard');
      } else {
        throwError(() => new Error('Invalid login credentials'));
      }
    });
    // this.store.dispatch(login({userName, password}));
  }
}
