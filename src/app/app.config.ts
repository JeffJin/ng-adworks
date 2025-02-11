import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withHttpTransferCacheOptions,
  withI18nSupport,
  withIncrementalHydration
} from '@angular/platform-browser';
// import { provideRouterStore } from '@ngrx/router-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withHttpTransferCacheOptions({
        includeHeaders: [],
        includePostRequests: false,
        includeRequestsWithAuthHeaders: false,
    }), withI18nSupport(), withIncrementalHydration()),
    // provideRouterStore()
]
};
