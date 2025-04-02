import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideApollo } from 'apollo-angular';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideApollo(() => ({ uri: environment.apiUrl, cache: new InMemoryCache() })),
    provideHttpClient(),    
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
