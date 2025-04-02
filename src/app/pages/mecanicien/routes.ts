import { Routes } from "@angular/router";
import { MecanicienComponent } from "./mecanicien/mecanicien.component";
import { ListTaskComponent } from "./list-task/list-task.component";
import { DetailTaskComponent } from "./detail-task/detail-task.component";

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ListTaskComponent, // Liste des tâches par défaut
                data: { title: 'Mécanicien - Tâches' }
            },
            {
                path: 'detail-task/:idrendezvous',
                component: DetailTaskComponent, // Affichage du détail d'une tâche
                data: { title: 'Mécanicien - Détail de la tâche' }
            }
        ]
    }
];