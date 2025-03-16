import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Inscription concours'
    },
    children: [
      {
        path: '',
        redirectTo: 'liste',
        pathMatch: 'full'
      },
      {
        path: 'liste',
        loadComponent: () => import('./liste-inscription/liste-inscription.component').then(m => m.ListeInscriptionComponent),
        data: {
          title: 'Liste'
        }
      }
    ]
  }
];

