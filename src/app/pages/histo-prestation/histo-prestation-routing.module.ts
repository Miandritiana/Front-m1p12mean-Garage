import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoPrestationComponent } from './histo-prestation/histo-prestation.component';


export const  HistoPrestationComponentRoutingModule: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HistoPrestationComponent,
      },
    ],
  },
];  