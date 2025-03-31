import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@coreui/angular';
import { StepsModule } from 'primeng/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DemandePrestationManagerRoutingModule } from './demande-prestation-manager-routing.module';

import { DemandePrestationManagerComponent } from './demande-prestation-manager/demande-prestation-manager.component';
import { DemandeRdvComponent } from './demande-rdv/demande-rdv.component';
import { HistoPrestationComponent } from './../histo-prestation/histo-prestation/histo-prestation.component';

@NgModule({
  declarations: [
    DemandePrestationManagerComponent,
    DemandeRdvComponent,
    HistoPrestationComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    StepsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DemandePrestationManagerRoutingModule),
  ],
  exports: [DemandeRdvComponent],
})
export class DemandePrestationManagerModule { }
