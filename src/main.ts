/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';


const updatedAppConfig = {
  appConfig,
  providers: [
    appConfig.providers || [], // Inclure les autres providers s'il y en a
    provideHttpClient(), // Fournir HttpClient ici
  ],
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch(err => console.error(err));

