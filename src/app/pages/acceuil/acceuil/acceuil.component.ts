import { Component, OnInit } from '@angular/core';
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
import { NgFor, NgStyle, NgIf } from '@angular/common';
import { StepperService } from '../../../services/stepper.service';
import { DemandePrestationComponent } from '../../demande-prestation/demande-prestation/demande-prestation.component';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { RendezVous } from '../../../modele/RendezVous';

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
    NgIf,
    NgStyle,
    DemandePrestationComponent
  ],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent implements OnInit{

  rdvAttente: RendezVous[] = [];
  errorMessage: string = '';

  constructor(
    private router: Router, 
    private clientService: ClientService,
    private localStorageService : LocalStorageService) 
  { }

  ngOnInit(): void {
    var idClient=this.localStorageService.getLoginInfo()?.iduser ?? '';
    this.getRendezVousAttente(idClient);
    throw new Error('Method not implemented.');
  }

  goToDemandePrestation() {
    this.router.navigate(['/demande-prestation']);
  }

  getRendezVousAttente(idClient: string): any {
    this.clientService.rendezVousAttente(idClient).subscribe(
      (response: any[]) => { // Explicitly define response as an array
        this.rdvAttente = response.map((item: any) => ({
          date: item.date || 'N/A', // Handle missing properties
          motif: item.motif || 'No motif provided'
        }));
      },
      (error) => {
        console.error('Error fetching rendez-vous en attente:', error);
        this.errorMessage = error.error.message;
      }
    );
  }


}
