import { Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';

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
                component: AcceuilComponent,
                data: {
                    title: 'Accueil pour client'
                }
            }
        ]
    }
];