import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './dashboard/documents/documents.component';
import { ImagesComponent } from './dashboard/images/images.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { VideosComponent } from './dashboard/videos/videos.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'videos', component: VideosComponent },
      { path: 'images', component: ImagesComponent },
      { path: 'documents', component: DocumentsComponent },
    ]
  }
];
