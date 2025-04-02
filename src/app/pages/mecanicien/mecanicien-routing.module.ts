import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MecanicienComponent } from './mecanicien/mecanicien.component';


export const MecanicienRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MecanicienComponent,
      },
    ],
  },
];  