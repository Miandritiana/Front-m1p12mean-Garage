import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Concours'
    },
    children: [
      {
        path: '',
        redirectTo: 'liste',
        pathMatch: 'full'
      },
      {
        path: 'fiche/:id',
        loadComponent: () => import('./fiche/fiche.component').then(m => m.FicheComponent),
        data: {
          title: 'Fiche concours'
        }
      },
      {
        path: 'liste',
        loadComponent: () => import('./liste/liste.component').then(m => m.ListeComponent),
        data: {
          title: 'Liste'
        }
      }
    ]
  }
];

