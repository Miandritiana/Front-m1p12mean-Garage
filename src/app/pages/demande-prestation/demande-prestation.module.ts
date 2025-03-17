import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoVehiculeComponent } from './info-vehicule/info-vehicule.component';
import { VotreDevisComponent } from './votre-devis/votre-devis.component';
import { ConfirmeDevisComponent } from './confirme-devis/confirme-devis.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { DemandePrestationComponent } from './demande-prestation/demande-prestation.component';

import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InfoVehiculeComponent,
    VotreDevisComponent,
    ConfirmeDevisComponent,
    RendezVousComponent,
    DemandePrestationComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    StepsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DemandePrestationModule { }
