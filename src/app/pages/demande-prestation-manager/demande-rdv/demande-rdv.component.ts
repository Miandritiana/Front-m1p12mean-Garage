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
} from '@coreui/angular';
import { ManagerService } from '../../../services/manager.service';
import { Client } from '../../../modele/Client';

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
    TextColorDirective, NgFor, NgStyle, NgIf
  ],
  templateUrl: './demande-rdv.component.html',
  styleUrl: './demande-rdv.component.scss'
})
export class DemandeRdvComponent implements OnInit {

  clients: Client[] = [ ];

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {}

  // Handle the date selection
  selectDate(client: Client): void {
    console.log('Client selecetionn... ', client.client);
  }

  acceptDate(client: Client): void {
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
  
}
