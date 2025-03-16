import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '',
        loadComponent: () => import('./inscription/inscription.component').then(m => m.InscriptionComponent),
        data: {
          title: 'Situation globale'
        }
      }

    ]
  }
];

