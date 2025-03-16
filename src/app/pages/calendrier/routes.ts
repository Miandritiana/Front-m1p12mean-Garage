import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Calendrier'
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
          title: 'Liste des calendriers'
        }
      }
    //   {
    //     path: 'update/:id',
    //     loadComponent: () => import('./update/update.component').then(m => m.UpdateComponent),
    //     data: {
    //       title: 'Modifier le sujet'
    //     }
    //   }

    ]
  }
];

