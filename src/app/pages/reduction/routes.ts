import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./liste/liste.component').then(m => m.ListeComponent),
        data: {
          title: 'Recouvrement'
        }
      }
    ]
  },

];

