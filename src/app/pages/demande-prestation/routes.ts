import { Routes } from '@angular/router';
import { DemandePrestationComponent } from './demande-prestation/demande-prestation.component';

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
                component: DemandePrestationComponent,
                data: {
                    title: 'Demande préstation'
                }
            }
        ]
    }
];