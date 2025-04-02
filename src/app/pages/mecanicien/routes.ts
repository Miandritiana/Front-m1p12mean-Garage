import { Routes } from "@angular/router";
import { MecanicienComponent } from "./mecanicien/mecanicien.component";
import { ListTaskComponent } from "./list-task/list-task.component";
import { DetailTaskComponent } from "./detail-task/detail-task.component";

export const routes: Routes = [
    {
        path: '',
        component: MecanicienComponent,
        children: [
            {
                path: 'detail-task/:idrendezvous', // ✅ Dynamic route parameter
                component: DetailTaskComponent,
                data: { title: 'Détail Tâche' }
            }
        ]
    }
];