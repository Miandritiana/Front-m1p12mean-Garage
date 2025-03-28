import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@coreui/angular';
import { StepsModule } from 'primeng/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HistoPrestationComponentRoutingModule } from './histo-prestation-routing.module';

import { HistoPrestationComponent } from './histo-prestation/histo-prestation.component';
import { RendezVousValideComponent } from './rendez-vous-valide/rendez-vous-valide.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    HistoPrestationComponent,
    RendezVousValideComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    StepsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(HistoPrestationComponentRoutingModule),
  ],
  exports: [HistoPrestationComponent],
})
export class HistoPrestationComponentModule { }
