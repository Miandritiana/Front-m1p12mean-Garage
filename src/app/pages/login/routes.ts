import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path:'inscription',
    loadComponent: () => import('./inscription/inscription.component').then(m => m.InscriptionComponent),
    data: {
      title: 'Inscription'
    }
  },
];

