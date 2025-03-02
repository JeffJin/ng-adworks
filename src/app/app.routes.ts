import { provideRouter, Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { ErrorComponent } from './error/error.component';
import { authGuard } from './guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { DocumentsComponent } from './pages/dashboard/documents/documents.component';
import { HistoryComponent } from './pages/dashboard/history/history.component';
import { ImagesComponent } from './pages/dashboard/images/images.component';
import { OverviewComponent } from './pages/dashboard/overview/overview.component';
import { ReportsComponent } from './pages/dashboard/reports/reports.component';
import { UsersComponent } from './pages/dashboard/users/users.component';
import { VideosComponent } from './pages/dashboard/videos/videos.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LatestComponent } from './pages/latest/latest.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { assetsKey, assetsReducer } from './store/reducers/assets.reducers';
import { dashboardKey, dashboardReducer } from './store/reducers/dashboard.reducers';
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
    loadComponent: () => import('./pages/dashboard/dashboard.component')
      .then(c => c.DashboardComponent),
    providers: [
      provideState({ name: assetsKey, reducer: assetsReducer }),
      provideState({ name: dashboardKey, reducer: dashboardReducer }),
    ],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'videos', component: VideosComponent },
      { path: 'images', component: ImagesComponent },
      { path: 'documents', component: DocumentsComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'users', component: UsersComponent },
    ],
    canActivate: [ authGuard ],
  }, {
    path: '**', component: NotFoundComponent
  },

];
