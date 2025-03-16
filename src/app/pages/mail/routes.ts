import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Corps d\'un mail'
    },
    loadComponent: () =>
      import('../mail/corpsmail/corpsmail.component').then(m => m.CorpsmailComponent),
  },
  {
    path: 'historique',
    data: { title: 'Historique des mails' },
    loadComponent: () =>
      import('../mail/historique-mail/historique-mail.component').then(m => m.HistoriqueMailComponent)
  }
];
