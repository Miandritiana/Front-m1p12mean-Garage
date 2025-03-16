import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionComponent } from './inscription/inscription.component';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        InscriptionComponent
    ],
    imports: [
        CommonModule,
        ChartjsModule,
        NgChartsConfiguration,
        NgChartsModule
    ],
    exports: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StatistiqueModule { }
