import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@coreui/angular';

import { MecanicienRoutingModule } from './mecanicien-routing.module';
import { RouterModule } from '@angular/router';

import { StepsModule } from 'primeng/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    StepsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(MecanicienRoutingModule),
  ]
})
export class MecanicienModule { }
