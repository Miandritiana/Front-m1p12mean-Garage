import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Frais de scolarité'
    },
    children: [
      {
        path: '',
        redirectTo: 'liste',
        pathMatch: 'full'
      },
      {
        path: 'liste',
        loadComponent: () => import('./liste/liste.component').then(m => m.ListeComponent),
        data: {
          title: 'Liste frais de scolarité'
        }
      },
      {
        path: 'ajouter/:idAnneeScolaire/:anneeScolaire',
        loadComponent: () => import('./ajouter/ajouter.component').then(m => m.AjouterComponent),
        data: {
          title: 'Ajouter frais de scolarité'
        }
      },
    ]
  }
];

