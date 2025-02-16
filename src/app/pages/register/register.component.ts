import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UniqueEmailValidator } from '../../shared/directives/unique-email.drective';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  emailControl: FormControl;
  constructor(private fb: FormBuilder,
              private emailValidator: UniqueEmailValidator,
              private router: Router) {
    this.registerForm = this.fb.group({
      email: [
        '',
        Validators.required
      ],
      password: [''],
      confirmPassword: [''],
    });
    this.emailControl = this.registerForm.get('email') as FormControl;
    this.emailControl.addAsyncValidators([this.emailValidator.validate.bind(this.emailValidator)]);
  }

  register(): void {

  }
}
