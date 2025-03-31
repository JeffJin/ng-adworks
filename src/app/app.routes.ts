import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { ErrorComponent } from './pages/error/error.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LatestComponent } from './pages/latest/latest.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { loginFormKey, loginFormReducer } from './store/reducers/login-form.reducers';

export const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  {
    path: 'login',
    providers: [
      provideState({
        name: loginFormKey, reducer: loginFormReducer
      }),
    ],
    component: LoginComponent,
  },
  { path: 'latest', component: LatestComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'dashboard',
    loadChildren: async () => (await import('./pages/dashboard/dashboard.routes')).dashboardRoutes
  },
  { path: '**', component: NotFoundComponent },

];
