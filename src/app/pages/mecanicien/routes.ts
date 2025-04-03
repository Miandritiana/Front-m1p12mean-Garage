import { Routes } from "@angular/router";
import { MecanicienComponent } from "./mecanicien/mecanicien.component";
import { ListTaskComponent } from "./list-task/list-task.component";
import { DetailTaskComponent } from "./detail-task/detail-task.component";
import { ChangeMdpComponent } from "./change-mdp/change-mdp.component";

export const routes: Routes = [
    {
        path: '',
        component: MecanicienComponent,
        children: [
            {
                path: 'change-mdp',
                component: ChangeMdpComponent,
                data: { title: 'Changer le mot de passe' }
            }
        ]
    }
];