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
  FormCheckComponent,
}
from '@coreui/angular';

import { NgFor, NgStyle, NgIf, NgClass, CommonModule } from '@angular/common';
import { MecanicienService } from '../../../services/mecanicien.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-task',
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
    NgFor, NgStyle, NgIf, NgClass, CommonModule
  ],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.scss'
})
export class ListTaskComponent implements OnInit{

  listTache: any[] = [];
  @Output() dataEvent = new EventEmitter<any>();
  isAppear: boolean = true;



  constructor (
    private mecanicienService: MecanicienService,
    private localStorageService : LocalStorageService,
    private router: Router
  )
  {}

  ngOnInit() {
    var idMecanicien = this.localStorageService.getLoginInfo()?.iduser ?? '';
    this.getListTache(idMecanicien);
  }

  getListTache(idmecanicien: string) {
    this.mecanicienService.tacheWithSearch(undefined, undefined, idmecanicien).subscribe(
      data => {
        this.listTache = data;
      }
    )
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
    // this.isAppear = false;
    this.dataEvent.emit(idrendezvous);
  }


  reload() {
    this.getListTache(this.localStorageService.getLoginInfo()?.iduser ?? '');
  }
}
