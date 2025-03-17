import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoVehiculeComponent } from './info-vehicule/info-vehicule.component';
import { VotreDevisComponent } from './votre-devis/votre-devis.component';
import { ConfirmeDevisComponent } from './confirme-devis/confirme-devis.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { DemandePrestationComponent } from './demande-prestation/demande-prestation.component';

import { DemandePrestationRoutingModule } from './demande-prestation-routing.module';

import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DemandePrestationComponent,
    InfoVehiculeComponent,
    VotreDevisComponent,
    ConfirmeDevisComponent,
    RendezVousComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    StepsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DemandePrestationRoutingModule),

  ],
  exports: [DemandePrestationComponent]
})
export class DemandePrestationModule { }
