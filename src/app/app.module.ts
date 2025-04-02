import { NgModule } from '@angular/core';
import { AcceuilModule } from './pages/acceuil/acceuil.module';
import { NgChartsModule } from 'ng2-charts';
import { DemandePrestationComponent } from './pages/demande-prestation/demande-prestation/demande-prestation.component';
import { DemandePrestationManagerComponent } from './pages/demande-prestation-manager/demande-prestation-manager/demande-prestation-manager.component';
import { RouterModule } from '@angular/router';

import { MecanicienModule } from './pages/mecanicien/mecanicien.module';
@NgModule({
  imports: [
    NgChartsModule,
    AcceuilModule
  ],
  declarations : [
    DemandePrestationComponent,
    DemandePrestationManagerComponent,
    RouterModule,
    MecanicienModule
  ]
})
export class AppModule { }
