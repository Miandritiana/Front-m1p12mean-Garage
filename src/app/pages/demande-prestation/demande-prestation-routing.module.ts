import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandePrestationComponent } from './demande-prestation/demande-prestation.component';


export const  DemandePrestationRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DemandePrestationComponent,
      },
    ],
  },
];  