import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DocumentsComponent } from './pages/dashboard/documents/documents.component';
import { HistoryComponent } from './pages/dashboard/history/history.component';
import { ImagesComponent } from './pages/dashboard/images/images.component';
import { OverviewComponent } from './pages/dashboard/overview/overview.component';
import { RepotsComponent } from './pages/dashboard/repots/repots.component';
import { VideosComponent } from './pages/dashboard/videos/videos.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LatestComponent } from './pages/latest/latest.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'latest', component: LatestComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'blog', component: BlogComponent },
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
      { path: 'history', component: HistoryComponent },
      { path: 'reports', component: RepotsComponent },
    ]
  }
];
