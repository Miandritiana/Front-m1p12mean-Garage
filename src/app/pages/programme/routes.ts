import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Programme'
    },
    children: [
      {
        path: '',
        redirectTo: 'liste',
        pathMatch: 'full'
      },
      {
        path: 'fiche',
        loadComponent: () => import('./programme-fiche/programme-fiche.component').then(m => m.ProgrammeFicheComponent),
        data: {
          title: 'Fiche calendrier'
        }
      },
      {
        path: 'liste',
        loadComponent: () => import('./programme-entretien/programme-entretien.component').then(m => m.ProgrammeEntretienComponent),
        data: {
          title: 'Calendrier'
        }
      },
    ]
  }
];

