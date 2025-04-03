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
    FormatCurrencyPipe
  ],
  templateUrl: './rendez-vous-valide.component.html',
  styleUrl: './rendez-vous-valide.component.scss'
})
export class RendezVousValideComponent implements OnInit {

    @Output() dataEvent = new EventEmitter<any>();

    histoRdvValider: any[] = [];
    listDetail: any = {};
  
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
    this.managerService.histoRdvValider(undefined, undefined).subscribe(
      (data) => {
        this.histoRdvValider = data;
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
