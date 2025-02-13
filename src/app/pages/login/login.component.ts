import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { IUser } from '../../data/models/dtos';
import { authApiActions } from '../../store/actions/auth.actions';
import { selectUser } from '../../store/selectors';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: UntypedFormGroup;
  user$: Observable<IUser|null>;

  userName = new UntypedFormControl('', [
    Validators.required
  ]);
  password = new UntypedFormControl('', [
    Validators.required
  ]);
  rememberMe = new UntypedFormControl('', [
  ]);

  constructor(private fb: UntypedFormBuilder,
              private router: Router,
              private store: Store) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
      rememberMe: [false],
    });
    this.user$ = this.store.select(selectUser);
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
    this.store.dispatch(authApiActions.login({userName, password}));
  }
}
