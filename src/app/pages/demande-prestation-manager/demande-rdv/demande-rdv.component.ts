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

interface Client {
  id: number;
  name: string;
  proposedDates: string[]; // An array of proposed dates
  selectedDate?: string; // The selected date by the manager
}

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

  clients: Client[] = [
    { id: 1, name: 'Client 1', proposedDates: ['2025-03-01T10:00', '2025-03-02T10:00'] },
    { id: 2, name: 'Client 2', proposedDates: ['2025-03-01T11:00', '2025-03-02T11:00'] },
    { id: 3, name: 'Client 3', proposedDates: ['2025-03-01T12:00', '2025-03-02T12:00'] }
  ];

  filteredClients: Client[] = [...this.clients]; // Clients filtered by date

  constructor() {}

  ngOnInit(): void {}

  filterClientsByDate(event: any): void {
    const selectedDate = event.target.value;
    if (selectedDate) {
      this.filteredClients = this.clients.filter(client => 
        client.proposedDates.some(date => new Date(date).toISOString().startsWith(selectedDate))
      );
    } else {
      this.filteredClients = [...this.clients]; // Reset filter if no date is selected
    }
  }

  // Handle the date selection
  selectDate(client: Client): void {
    console.log('Date selected for', client.name, client.selectedDate);
  }

  acceptDate(client: Client): void {
    if (client.selectedDate) {
      console.log('Date accepted for', client.name, client.selectedDate);
      // Here, you can process the accepted date (e.g., send it to the server)
    } else {
      alert('Please select a date before accepting!');
    }
  }
}
