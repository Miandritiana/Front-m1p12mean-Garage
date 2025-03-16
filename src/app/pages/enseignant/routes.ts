import { Routes } from '@angular/router';
import { DisponibiliteEnseignantComponent } from './disponibilite-enseignant/disponibilite-enseignant.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Enseignant'
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
          title: 'Liste des enseignants'
        }
      },
      {
        path: 'disponibilite',
        loadComponent: () => import('./disponibilite-enseignant/disponibilite-enseignant.component').then(m => m.DisponibiliteEnseignantComponent),
        data: {
          title: 'Ajouter disponibilité enseignants'
        }
      },
      {
        path: 'liste-disponibilite',
        loadComponent: () => import('./liste-disponibilite-enseignant/liste-disponibilite-enseignant.component').then(m => m.ListeDisponibiliteEnseignantComponent),
        data: {
          title: 'Liste disponibilité enseignants'
        }
      }

    ]
  }
];

