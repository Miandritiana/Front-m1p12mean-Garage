import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Sujet'
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
          title: 'Fiche du sujet'
        }
      },
      {
        path: 'liste',
        loadComponent: () => import('./liste/liste.component').then(m => m.ListeComponent),
        data: {
          title: 'Liste des sujets'
        }
      },
      {
        path: 'saisie',
        loadComponent: () => import('./saisie/saisie.component').then(m => m.SaisieComponent),
        data: {
          title: 'Saisie sujet'
        }
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update/update.component').then(m => m.UpdateComponent),
        data: {
          title: 'Modifier le sujet'
        }
      }
    ]
  }
];

