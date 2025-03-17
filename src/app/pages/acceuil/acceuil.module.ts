import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { RouterModule, Routes } from '@angular/router';
import { DemandePrestationComponent } from '../demande-prestation/demande-prestation/demande-prestation.component';

const routes: Routes = [
  { path: '', component: AcceuilComponent }
];

@NgModule({
  declarations: [AcceuilComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DemandePrestationComponent
  ],
  exports: [RouterModule]
})
export class AcceuilModule { 

}
