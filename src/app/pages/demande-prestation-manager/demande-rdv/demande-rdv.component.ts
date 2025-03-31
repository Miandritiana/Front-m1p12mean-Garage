import { Component, OnInit } from '@angular/core';

import { NgFor, NgStyle, NgIf } from '@angular/common';

import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent,
  TextColorDirective,
  ModalModule,
  FormCheckComponent
} from '@coreui/angular';
import { ManagerService } from '../../../services/manager.service';
import { Client } from '../../../modele/Client';
import { Mecanicien } from '../../../modele/Mecanicien';
import { FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-rdv',
  standalone: true,
  imports: [
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardGroupComponent,
    ColComponent,
    ContainerComponent,
    FormControlDirective,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    RowComponent,
    TextColorDirective, NgFor, NgStyle, NgIf, ModalModule, FormCheckComponent,
    ReactiveFormsModule
  ],
  templateUrl: './demande-rdv.component.html',
  styleUrl: './demande-rdv.component.scss'
})
export class DemandeRdvComponent implements OnInit {

  clients: Client[] = [ ];
  showSaisie: boolean = false;
  mecaniciensDisponibles: Mecanicien[] = [];
  dateSelected: string = '';
  dateSelectedFormated: Date | null = null;
  idRendezVousSelected: string = '';
  idClientSelected: string = '';

  mecanicienForm = new FormGroup({
    selectedMecanicien: new FormControl('', Validators.required)
  });

  constructor(private managerService: ManagerService) {}

  ngOnInit() {
    this.getRendezVousEnAttente();
  }

  // Handle the date selection
  selectDate(dateSelected: string): void {
    console.log('Date voafidy... ', dateSelected);

    // Convert the string to a Date object
    const dateObject = new Date(dateSelected);
    
    // Verify the date is valid
    if (isNaN(dateObject.getTime())) {
      console.error('Invalid date string:', dateSelected);
      return;
    }
    
    this.dateSelectedFormated = dateObject;
    this.getMecanicienDispo(this.dateSelectedFormated);
    
  }

  acceptDate(client: Client) {
    console.log("cliiiiiiiiiiick")
    this.idRendezVousSelected = client.idrendezvous;
    this.idClientSelected = client.idclient;
    this.mecanicienForm.reset();
    this.showSaisie = true;
  }

  proposeDate(client: Client): void {
  }

  getRendezVousEnAttente(): void {
    this.managerService.rendezVousEnAttente().subscribe(
      (clients: Client[]) => {
        this.clients = clients; // Assign the actual array
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  toggleLiveDemo() {
    this.showSaisie = !this.showSaisie;
  }

  getMecanicienDispo(date: Date) {
    this.managerService.mecaniciensDispo(date).subscribe({
      next: (mecaniciens: Mecanicien[]) => {
        this.mecaniciensDisponibles = mecaniciens;
        this.mecanicienForm.patchValue({ selectedMecanicien: '' });
      },
      error: (err) => {
        console.error('Error fetching available mecanicien:', err);
        this.mecaniciensDisponibles = []; // Clear the list on error
      }
    });
  }
  
  save() {
    if (this.mecanicienForm.valid) {
      const selectedId = this.mecanicienForm.value.selectedMecanicien;
      
      if (!selectedId) {
        Swal.fire('Error', 'Choisissez un mécanicien', 'error');
        return;
      }

      this.managerService.rendezVousValider(
        this.idRendezVousSelected,
        this.dateSelectedFormated,
        selectedId,
        this.idClientSelected
      ).subscribe({
        next: (response: { message: string }) => {
          Swal.fire('Success', 'Appointment confirmed!', 'success');
          this.toggleLiveDemo();
          this.getRendezVousEnAttente();
        },
        error: (error: { error?: { message?: string } }) => {
          Swal.fire('Error', error.error?.message || 'Failed to confirm appointment', 'error');
        }
      });
    }
  }
  
}
