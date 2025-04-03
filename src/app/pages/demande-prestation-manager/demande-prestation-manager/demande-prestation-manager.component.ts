import { Component, OnInit } from '@angular/core';

import { DemandeRdvComponent } from '../demande-rdv/demande-rdv.component';
import { ButtonDirective, CardBodyComponent, CardComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { NgFor, NgIf } from '@angular/common';
import { HistoPrestationComponent } from './../../histo-prestation/histo-prestation/histo-prestation.component';
import { FormatDatePipe } from '../../../validator/FormatDatePipe';

import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-prestation-manager',
  standalone: true,
  imports: [
    DemandeRdvComponent,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    ColComponent,
    RowComponent,
    TableDirective,
    IconDirective,
    NgFor,
    NgIf,
    HistoPrestationComponent,
    FormatDatePipe
  ],
  templateUrl: './demande-prestation-manager.component.html',
  styleUrl: './demande-prestation-manager.component.scss'
})
export class DemandePrestationManagerComponent implements OnInit {

    constructor(
      private router: Router, 
      private localStorageService: LocalStorageService
    ) { }

  ngOnInit(): void {
    const userRole = this.localStorageService.getLoginInfo()?.role ?? '';

    if (userRole != '3') {
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

}
