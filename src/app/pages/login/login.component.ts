import { isPlatformBrowser, NgClass } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  effect,
  PLATFORM_ID,
  OnInit, Inject
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';

import { StorageService } from '../../data/services/storage.service';
import { validateEmail, validatePassword } from '../../data/utils/validators';
import { AuthApiActions } from '../../store/actions/auth.actions';
import { LoginFormActions, LoginFormStatus } from '../../store/actions/login-form.actions';
import {
  selectLoginFormEmail,
  selectLoginFormPassword,
  selectLoginFormStatus,
  selectUser
} from '../../store/app.selectors';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  protected readonly LoginFormStatus = LoginFormStatus;
  protected loginForm: FormGroup;
  private emailControl: FormControl;
  private pwdControl: FormControl;
  private rememberMeControl: FormControl;
  private user$;
  protected formStatus$;
  protected formStatus;
  protected email;
  protected isEmailValid;
  protected password;
  protected isPasswordValid;
  protected isFormValid;

  constructor(private fb: FormBuilder,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object,
              private store: Store) {
    this.loginForm = this.fb.group({
      email: [ '', Validators.required, ],
      password: [ '', Validators.required ],
      rememberMe: [ false ],
    });
    this.emailControl = this.loginForm.get('email') as FormControl;
    this.pwdControl = this.loginForm.get('password') as FormControl;
    this.rememberMeControl = this.loginForm.get('rememberMe') as FormControl;

    this.user$ = this.store.select(selectUser);
    this.formStatus$ = this.store.select(selectLoginFormStatus);
    this.formStatus = toSignal(this.formStatus$);
    this.email = this.store.selectSignal(selectLoginFormEmail);
    this.password = this.store.selectSignal(selectLoginFormPassword);

    this.isEmailValid = computed(() => validateEmail(this.email()));
    this.isPasswordValid = computed(() => validatePassword(this.password()));
    this.isFormValid = computed(() =>
      this.isEmailValid() && this.isPasswordValid()
    );
    //analytics effect
    effect(() => {
      console.log(`form state updated, password valid: ${this.password()}, email valid: ${this.email()}`);
    });

    //this happens after SSR on client side
    afterNextRender(() => {
      console.log('afterNextRender :: isBrowser', isPlatformBrowser(this.platformId));
      console.log('afterNextRender :: form values', this.emailControl.value, this.pwdControl.value);
    });
  }

  ngOnInit(): void {
    this.emailControl?.valueChanges.subscribe((val => {
      console.log('email value changed', val);
      this.store.dispatch(LoginFormActions.updateEmail({ payload: val }));
    }));
    this.pwdControl?.valueChanges.subscribe((val => {
      console.log('password value changed', val);
      this.store.dispatch(LoginFormActions.updatePassword({ payload: val }));
    }));
    this.rememberMeControl?.valueChanges.subscribe((val => {
      console.log('rememberMe value changed', val);
      this.store.dispatch(LoginFormActions.updateRememberMe({ payload: val }));
    }));

    this.formStatus$.subscribe(status => {
      if (status == LoginFormStatus.Submitting) {
        this.emailControl?.disable();
        this.pwdControl?.disable();
        this.rememberMeControl?.disable();
      } else {
        this.emailControl?.enable();
        this.pwdControl?.enable();
        this.rememberMeControl?.enable();
      }
    });

    this.user$?.subscribe((user) => {
      if (user && user.userName && user.token) {
        this.store.dispatch(LoginFormActions.resetLoginForm());
        this.router.navigateByUrl('dashboard');
      } else {
        throwError(() => new Error('Invalid login credentials'));
      }
    });
  }

  loginToSite() {
    const email = this.emailControl.value;
    const password = this.pwdControl.value;
    this.store.dispatch(AuthApiActions.login({ email, password }));
    this.store.dispatch(LoginFormActions.submitForm());
  }
}
