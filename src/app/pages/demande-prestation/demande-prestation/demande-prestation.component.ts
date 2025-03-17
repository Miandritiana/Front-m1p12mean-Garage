import { Component } from '@angular/core';
import { StepperService } from '../../../services/stepper.service';

import { InfoVehiculeComponent } from '../info-vehicule/info-vehicule.component';
import { VotreDevisComponent } from '../votre-devis/votre-devis.component';
import { ConfirmeDevisComponent } from '../confirme-devis/confirme-devis.component';
import { RendezVousComponent } from '../rendez-vous/rendez-vous.component';

@Component({
  selector: 'app-demande-prestation',
  standalone: true,
  imports: [
    InfoVehiculeComponent,
    VotreDevisComponent,
    ConfirmeDevisComponent,
    RendezVousComponent
  ],
  templateUrl: './demande-prestation.component.html',
  styleUrl: './demande-prestation.component.scss'
})
export class DemandePrestationComponent {

  currentStep = 1;

  constructor(private stepperService: StepperService) { }

  ngOnInit() {
    this.stepperService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });
  }

}
