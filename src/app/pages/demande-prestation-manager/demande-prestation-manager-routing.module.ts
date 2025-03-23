import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandePrestationManagerComponent } from './demande-prestation-manager/demande-prestation-manager.component';


export const  DemandePrestationManagerRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DemandePrestationManagerComponent,
      },
    ],
  },
];  