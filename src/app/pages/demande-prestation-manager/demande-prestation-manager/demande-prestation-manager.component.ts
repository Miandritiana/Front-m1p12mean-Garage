import { Component } from '@angular/core';

import { DemandeRdvComponent } from '../demande-rdv/demande-rdv.component';
import { ButtonDirective, CardBodyComponent, CardComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { NgFor, NgIf } from '@angular/common';
import { HistoPrestationComponent } from './../../histo-prestation/histo-prestation/histo-prestation.component';

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
    HistoPrestationComponent
  ],
  templateUrl: './demande-prestation-manager.component.html',
  styleUrl: './demande-prestation-manager.component.scss'
})
export class DemandePrestationManagerComponent {

}
