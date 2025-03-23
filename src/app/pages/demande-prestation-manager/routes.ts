import { Routes } from "@angular/router";
import { DemandePrestationManagerComponent } from "./demande-prestation-manager/demande-prestation-manager.component";

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
                component: DemandePrestationManagerComponent,
                data: {
                    title: 'Demande préstation'
                }
            }
        ]
    }
];