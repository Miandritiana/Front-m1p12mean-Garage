import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'liste',
        pathMatch: 'full'
      },
      {
        path: 'liste',
        loadComponent: () => import('./entretient-liste/entretient-liste.component').then(m => m.EntretientListeComponent),
        data: {
          title: 'Concours à noter'
        }
      },
      {
        path: ':id',
        loadComponent: () => import('./note-entretien-saisie/note-entretien-saisie.component').then(m => m.NoteEntretienSaisieComponent),
        data: {
          title: 'Note entretient et écrit'
        }
      },
      {
        path: 'note/valide',
        loadComponent: () => import('./liste-note-valide/liste-note-valide.component').then(m => m.ListeNoteValideComponent),
        data: {
          title: 'Concours à noter'
        }
      }
    ]
  },

];

