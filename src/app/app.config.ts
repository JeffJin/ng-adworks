import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withHttpTransferCacheOptions,
  withI18nSupport,
  withIncrementalHydration
} from '@angular/platform-browser';
import { authReducer, authKey } from './store/reducers/auth.reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
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
    provideStore(),
    provideState({ name: authKey, reducer: authReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
