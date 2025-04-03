import { AfterViewInit, Component } from '@angular/core';
import { StepperService } from '../../../services/stepper.service';

import { InfoVehiculeComponent } from '../info-vehicule/info-vehicule.component';
import { VotreDevisComponent } from '../votre-devis/votre-devis.component';
import { RendezVousComponent } from '../rendez-vous/rendez-vous.component';

import { NgIf } from '@angular/common';
import Stepper from 'bs-stepper';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-prestation',
  standalone: true,
  imports: [
    InfoVehiculeComponent,
    VotreDevisComponent,
    RendezVousComponent,
    NgIf
  ],
  templateUrl: './demande-prestation.component.html',
  styleUrl: './demande-prestation.component.scss'
})
export class DemandePrestationComponent implements AfterViewInit {

  currentStep = 1;
  private stepper!: Stepper;
  check = false;

  infoVehiculeData: any;
  votreDevisData: any;
  rendezVousData: any;

  idType: any;
  idModele: any;
  idDevis: any;

  ngAfterViewInit(): void {
    this.stepper = new Stepper(document.querySelector('#stepper')!, {
      linear: false,
      animation: true
    });
  }

  constructor(
    public stepperService: StepperService,
    private router: Router, 
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.stepperService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });
    console.log("Parent idDevis:", this.idDevis);


    const userRole = this.localStorageService.getLoginInfo()?.role ?? '';

    if (userRole != '1') {
      Swal.fire({
        icon: 'error',
        title: 'Accès refusé',
        text: 'Vous n\'avez pas accès à cette page.',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/login']);
      });
    }

  }

  receiveMessage(message:any) {
    this.currentStep = message;
    this.activateStep();
  }


  activateStep(): void {
    const steps = document.querySelectorAll('.step');
    const contents = document.querySelectorAll('.content');
    this.check = false;
    steps.forEach((step, index) => {
      const button = step.querySelector('button');
      if (index + 1 === this.currentStep) {
        step.classList.add('active');
        button?.removeAttribute('disabled');
      } else {
        step.classList.remove('active');
      }
    });

    contents.forEach((content, index) => {
      if (index + 1 === this.currentStep) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  }

  receiveDataInfoVehicule(data:any) {
    this.infoVehiculeData = data;
    this.idType = this.infoVehiculeData.idType;
    this.idModele = this.infoVehiculeData.idModele;
  }

  receiveDataVotreDevis(data:any) {
    this.idDevis = data;
  }

  receiveRendezVous(data: any) {
    this.rendezVousData = data;
    this.idDevis = data;
  }

}
