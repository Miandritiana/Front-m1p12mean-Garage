import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'acceuil',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Accueil'
    },
    children: [
      {
        path: 'programme',
        loadChildren: () => import('./pages/programme/routes').then((m) => m.routes)
      },
      {
        path: 'etudiant',
        loadChildren: () => import('./pages/etudiant/routes').then((m) => m.routes)
      },
      {
        path: 'sujet',
        loadChildren: () => import('./pages/sujet/routes').then((m) => m.routes)
      },
      {
        path: 'calendrier',
        loadChildren: () => import('./pages/calendrier/routes').then((m) => m.routes)
      },
      {
        path: 'note',
        loadChildren: () => import('./pages/notation/routes').then((m) => m.routes)
      },
      {
        path: 'resultat',
        loadChildren: () => import('./pages/resultat/routes').then((m) => m.routes)
      },
      {
        path: 'enseignant',
        loadChildren: () => import('./pages/enseignant/routes').then((m) => m.routes)
      },
      {
        path: 'statistique',
        loadChildren: () => import('./pages/statistique/routes').then((m) => m.routes)
      },
      {
        path: 'frais-scolarite',
        loadChildren: () => import('./pages/frais-scolarite/routes').then((m) => m.routes)
      },
      {
        path: 'recouvrement',
        loadChildren: () => import('./pages/recouvrement/routes').then((m) => m.routes)
      },
      {
        path: 'bourse',
        loadChildren: () => import('./pages/bourse/routes').then((m) => m.routes)
      },
      {
        path: 'reduction',
        loadChildren: () => import('./pages/reduction/routes').then((m) => m.routes)
      },
      {
        path: 'acceuil',
        loadChildren: () => import('./pages/acceuil/routes').then((m) => m.routes) 
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'inscription',
    loadComponent: () => import('./pages/login/inscription/inscription.component').then(m => m.InscriptionComponent),
    data: {
      title: 'Inscription Page'
    }
  },
  { path: '**', redirectTo: 'etudiant' }
];
