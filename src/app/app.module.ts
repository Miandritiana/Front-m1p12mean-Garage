import { NgModule } from '@angular/core';
import { StatistiqueModule } from './pages/statistique/statistique.module';
import { AcceuilModule } from './pages/acceuil/acceuil.module';
import { NgChartsModule } from 'ng2-charts';
import { InscriptionComponent } from './pages/statistique/inscription/inscription.component';
import { DemandePrestationComponent } from './pages/demande-prestation/demande-prestation/demande-prestation.component';

@NgModule({
  imports: [
    StatistiqueModule,
    NgChartsModule,
    AcceuilModule
  ],
  declarations : [
    InscriptionComponent,
    DemandePrestationComponent
  ]
})
export class AppModule { }
