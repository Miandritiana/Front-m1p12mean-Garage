import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionMecanicienComponent } from './gestion-mecanicien/gestion-mecanicien.component';


export const GestionMecanicienRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GestionMecanicienComponent,
      },
    ],
  },
];  