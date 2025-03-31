import { Routes } from "@angular/router";
import { HistoPrestationComponent } from "./histo-prestation/histo-prestation.component";

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
                component: HistoPrestationComponent,
                data: {
                    title: 'Historique des prestations'
                }
            }
        ]
    }
];