import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  FormSelectDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { NgFor, NgStyle } from '@angular/common';
import { StepperService } from '../../../services/stepper.service';
import { DemandePrestationComponent } from '../../demande-prestation/demande-prestation/demande-prestation.component';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [
    AvatarComponent,
    ButtonDirective,
    ButtonGroupComponent,
    CardBodyComponent,
    CardComponent,
    CardFooterComponent,
    CardHeaderComponent,
    ColComponent,
    FormCheckLabelDirective,
    FormSelectDirective,
    GutterDirective,
    ProgressBarDirective,
    ProgressComponent,
    RowComponent,
    TableDirective,
    TextColorDirective,
    IconDirective,
    NgFor,
    NgStyle,
    DemandePrestationComponent
  ],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent {

  rdvAttente = [
    { date: '2023-05-01', motif: 'Simba daholo' },
    { date: '2023-05-02', motif: 'Mila fanovana' },
    { date: '2023-05-03', motif: 'Blabla car' },
  ];

  constructor(private stepperService: StepperService) {
    
  }

  goToStep4() {
    this.stepperService.setStep(4); // Définit l'étape 4
  }

}
