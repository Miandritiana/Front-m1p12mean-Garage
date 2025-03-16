import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Seuil note concours'
    },
    loadComponent: () => import('./seuil-note-concours.component').then(m => m.SeuilNoteConcoursComponent)
  }
];