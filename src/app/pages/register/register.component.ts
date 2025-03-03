import { animate, state, style, transition, trigger } from '@angular/animations';
import { JsonPipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data/services/auth.service';
import { EmailRegx, StrongPasswordRegx } from '../../data/services/utils';
import { UniqueEmailValidator } from '../../shared/directives/unique-email.drective';

enum RegisterFormStatus {
  Submitting = 'Submitting',
  Failure = 'Failure',
  Success = 'Success',
  Idle = 'Idle',
}

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    JsonPipe
  ],
  animations: [
    trigger('slideIn', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(-20px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', [
        animate('400ms ease-in')
      ]),
      transition('visible => hidden', [
        animate('400ms ease-out')
      ])
    ])
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  readonly RegisterFormStatus = RegisterFormStatus;
  registerForm: FormGroup;
  emailControl: FormControl;
  pwdControl: FormControl;
  confirmPwdControl: FormControl;

  protected formStatus = RegisterFormStatus.Idle;

  constructor(private fb: FormBuilder,
              private emailValidator: UniqueEmailValidator,
              private authService: AuthService,
              private router: Router) {
    this.registerForm = this.fb.group({
      email: [ '', [
        Validators.required,
        Validators.pattern(EmailRegx)
      ] ],
      password: [ '', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(StrongPasswordRegx)
      ] ],
      confirmPassword: [ '', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(StrongPasswordRegx)
      ] ],
    });
    this.emailControl = this.registerForm.get('email') as FormControl;
    this.emailControl.addAsyncValidators([ this.emailValidator.validate.bind(this.emailValidator) ]);
    this.pwdControl = this.registerForm.get('password') as FormControl;
    this.confirmPwdControl = this.registerForm.get('confirmPassword') as FormControl;
  }

  ngOnInit(): void {
    this.emailControl.valueChanges.subscribe((val => {

    }));
    this.pwdControl.valueChanges.subscribe((val => {

    }));
    this.confirmPwdControl.valueChanges.subscribe((val => {

    }));
  }

  errors: { code: string, description: string }[] = [];

  register(): void {
    const email = this.emailControl.value;
    const password = this.pwdControl.value;
    const confirmPassword = this.confirmPwdControl.value;
    this.formStatus = RegisterFormStatus.Submitting;
    this.authService.register(email, password, confirmPassword).subscribe((result) => {
      if (result && result.succeeded) {
        this.formStatus = RegisterFormStatus.Success;
        //TODO redirect to login page in 5 seconds

      } else {
        this.formStatus = RegisterFormStatus.Failure;
        if (result.errors) {
          this.errors = result.errors;
        }
      }
    }, (err) => {
      this.formStatus = RegisterFormStatus.Failure;
    });
  }

  clearErrors() {
    this.errors = [];
    this.formStatus = RegisterFormStatus.Idle;
    this.registerForm.reset();
  }

  resendEmail(email: string) {
    this.authService.resendVerification(email);
  }
}
