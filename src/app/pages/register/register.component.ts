import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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

  constructor(private fb: UntypedFormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      userName: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  register(): void {

  }
}
