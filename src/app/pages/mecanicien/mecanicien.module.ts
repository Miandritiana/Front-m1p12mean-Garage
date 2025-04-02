import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@coreui/angular';

import { MecanicienRoutingModule } from './mecanicien-routing.module';
import { RouterModule } from '@angular/router';

import { StepsModule } from 'primeng/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListTaskComponent } from './list-task/list-task.component';
import { DetailTaskComponent } from './detail-task/detail-task.component';

@NgModule({
  declarations: [
    ListTaskComponent,
    DetailTaskComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    StepsModule,
    FormsModule,
    ReactiveFormsModule,
    // RouterModule.forChild(MecanicienRoutingModule),
    RouterModule 
  ]
})
export class MecanicienModule { }
