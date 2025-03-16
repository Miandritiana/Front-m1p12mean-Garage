import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Resultat'
    },
    children: [
      {
        path: '',
        redirectTo: 'liste',
        pathMatch: 'full'
      },
      {
        path: 'liste',
        loadComponent: () => import('./resultat-liste/resultat-liste.component').then(m => m.ResultatListeComponent),
        data: {
          title: 'Resultat concours'
        }
      },
      {
        path: 'admission/automatique',
        loadComponent: () => import('./admission-automatique/admission-automatique.component').then(m => m.AdmissionAutomatiqueComponent),
        data: {
          title: 'Admission automatique'
        }
      },
      {
        path: 'liste-admis',
        loadComponent: () => import('./resultat-liste-admis/resultat-liste-admis.component').then(m => m.ResultatListeAdmisComponent),
        data: {
          title: 'Elèves admis'
        }
      },
      {
        path: 'inscription-definitive/:idConcours',
        loadComponent: () => import('./inscription-definitive/inscription-definitive.component').then(m => m.InscriptionDefinitiveComponent),
        data: {
          title: 'Inscription définitive'
        }
      },
      {
        path: 'inscription-definitive-liste',
        loadComponent: () => import('./inscription-definitive-liste/inscription-definitive-liste.component').then(m => m.InscriptionDefinitiveListeComponent),
        data: {
          title: 'Liste des étudiants inscrits définitivement'
        }
      }

    ]
  }
];

