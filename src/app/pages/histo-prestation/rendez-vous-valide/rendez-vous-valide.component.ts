import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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
} 
from '@coreui/angular';

import { NgFor, NgStyle, NgIf, NgClass } from '@angular/common';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { ManagerService } from '../../../services/manager.service';
import { FormatCurrencyPipe } from '../../../validator/FormatCurrencyPipe';
import { format } from 'date-fns';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rendez-vous-valide',
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
    TextColorDirective,
    ModalModule,
    FormCheckComponent,
    NgFor, NgStyle, NgIf, NgClass,
    FormatCurrencyPipe,
    FormsModule
  ],
  templateUrl: './rendez-vous-valide.component.html',
  styleUrl: './rendez-vous-valide.component.scss'
})
export class RendezVousValideComponent implements OnInit {

    @Output() dataEvent = new EventEmitter<any>();

    histoRdvValider: any[] = [];
    listDetail: any = {};

    selectedDate: string = '';
    selectedDateFormated: Date | null = null;
  
  constructor (
    private localStorageService : LocalStorageService,
    private router: Router,
    private managerService : ManagerService
  ) 
  {}

  ngOnInit(){
    this.getHisto();
  }
  getBadgeClass(avancement: number): string {
    switch (avancement) {
      case 1:
        return 'bg-warning'; // En attente (yellow)
      case 2:
        return 'bg-primary'; // En cours (blue)
      case 3:
        return 'bg-success'; // Terminé (green)
      default:
        return 'bg-secondary'; // Unknown state (gray)
    }
  }

  getBadgeLabel(avancement: number): string {
    switch (avancement) {
      case 1:
        return 'En attente';
      case 2:
        return 'En cours';
      case 3:
        return 'Terminé';
      default:
        return 'Inconnu';
    }
  }
  goDetail(idrendezvous: string) {
    this.getDetail(idrendezvous);
  }

  getHisto() {
    let dateParam = this.selectedDate ? format(new Date(this.selectedDate), "yyyy-MM-dd'T'HH:mm:ss") : undefined;

    this.managerService.histoRdvValider(undefined, undefined).subscribe(
      (data) => {
        this.histoRdvValider = data;
      }
    );
  }

  appliquer() {

    const dateObject = new Date(this.selectedDate);
    this.selectedDateFormated = dateObject;

    console.log(this.selectedDateFormated);
    

    this.managerService.histoRdvValider(this.selectedDateFormated, undefined).subscribe(
      (data) => {
        this.histoRdvValider = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des rendez-vous', error);
              // Check if the error has a message
        const errorMessage = error?.error?.message || 'Une erreur est survenue';

        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: errorMessage,
        });
      }
    );
    
  }

  getDetail(idRdv: string) {
    this.managerService.histoRdvDetail(idRdv).subscribe(
      (data) => {
        this.listDetail = data;
      }
    )
  }


}
