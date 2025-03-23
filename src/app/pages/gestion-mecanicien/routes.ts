import { Routes } from "@angular/router";
import { GestionMecanicienComponent } from "./gestion-mecanicien/gestion-mecanicien.component";

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
                component: GestionMecanicienComponent,
                data: {
                    title: 'Gestion Mecanicien'
                }
            }
        ]
    }
];