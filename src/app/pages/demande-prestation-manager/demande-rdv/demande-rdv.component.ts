import { Component, OnInit } from '@angular/core';

import { NgFor, NgStyle, NgIf, DatePipe } from '@angular/common';

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
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder  } from '@angular/forms';
import Swal from 'sweetalert2';
import { FormatDatePipe } from '../../../validator/FormatDatePipe';

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
    ReactiveFormsModule, FormatDatePipe
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
  selectedDateMap: { [key: string]: string } = {};
  idMecanicienSelected: string = '';
  proposeModal: boolean = false;
  proposeForm!: FormGroup;
  proposeDateSelected: string = '';

  mecanicienForm = new FormGroup({
    selectedMecanicien: new FormControl('', Validators.required)
  });

  constructor(
    private managerService: ManagerService,
    private formBuilder: FormBuilder,
  ) {
    this.proposeForm = this.formBuilder.group({
      selectedDatePropose: ['', [Validators.required]]
    });
  }

  formatDate(dateString: string, format: string): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(dateString, format) || '';
  }

  ngOnInit() {
    this.getRendezVousEnAttente();
  }

  // Handle the date selection
  selectDate(dateSelected: string, clientId: string): void {
    console.log('Date voafidy... ', dateSelected);

    this.selectedDateMap[clientId] = dateSelected;

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
    this.showSaisie = true;
    this.idRendezVousSelected = client.idrendezvous;
    this.idClientSelected = client.idclient;
    this.mecanicienForm.reset();
  }

  proposeDate(client: Client): void {
    this.proposeModal = true;
    this.idRendezVousSelected = client.idrendezvous;
    this.idClientSelected = client.idclient;
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

  toggleLiveDemoPropose() {
    this.proposeModal = !this.proposeModal;
  }

  getMecanicienDispo(date: Date) {
    this.managerService.mecaniciensDispo(date).subscribe({
      next: (mecaniciens: Mecanicien[]) => {
        this.mecaniciensDisponibles = mecaniciens;
        // this.mecanicienForm.patchValue({ selectedMecanicien: null });
      },
      error: (err) => {
        console.error('Error fetching available mecanicien:', err);
        this.mecaniciensDisponibles = []; // Clear the list on error
      }
    });
    console.log(this.mecaniciensDisponibles);
    
  }

  selectedMecanicien(idmecanicien: string) {
    console.log("etooooooooooooooooooooooooooooooooooooooo");
    
    this.idMecanicienSelected = idmecanicien;
    console.log(this.idMecanicienSelected);
    
    // this.save();
  }
  
  save() {
    console.log("etooooooooooo");
    
    // if (this.mecanicienForm.valid) {
      const selectedId = this.mecanicienForm.value.selectedMecanicien;
      
      if (!this.idMecanicienSelected) {
        Swal.fire('Error', 'Choisissez un mécanicien', 'error');
        return;
      }

      console.log(selectedId);
      console.log(this.idRendezVousSelected);
      console.log(this.dateSelectedFormated);
      console.log(this.idClientSelected);
      

      // this.managerService.rendezVousValider(
      //   this.idRendezVousSelected,
      //   this.dateSelectedFormated,
      //   selectedId,
      //   this.idClientSelected
      // ).subscribe({
      //   next: (response: { message: string }) => {
      //     Swal.fire('Success', 'Appointment confirmed!', 'success');
      //     this.toggleLiveDemo();
      //     this.getRendezVousEnAttente();
      //   },
      //   error: (error: { error?: { message?: string } }) => {
      //     Swal.fire('Error', error.error?.message || 'Failed to confirm appointment', 'error');
      //   }
      // });
    // }
  }

  submitProposeDate() {
    if (this.proposeForm.invalid) {
      this.proposeForm.markAllAsTouched();
      return;
    }
  
    const date = this.proposeForm.get('selectedDatePropose')?.value;
    
    if (date) {
      this.proposeDateSelected = date;
      this.toggleLiveDemoPropose(); // Close current modal
      this.showSaisie = true;   // Open mechanic selection modal
    }
  }
  
}
