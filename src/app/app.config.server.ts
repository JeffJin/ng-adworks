import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting, withAppShell } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { ROUTES } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes, withAppShell(AppShellComponent)),
    {
        provide: ROUTES,
        multi: true,
        useValue: [{
          path: 'shell',
          component: AppShellComponent
        }]
      }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
