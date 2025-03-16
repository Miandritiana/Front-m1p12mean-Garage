import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AcceuilComponent }
];

@NgModule({
  declarations: [AcceuilComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AcceuilModule { }
