import { DOCUMENT, NgFor, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
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
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsDropdownComponent } from '../../../views/widgets/widgets-dropdown/widgets-dropdown.component';
import { WidgetsBrandComponent } from '../../../views/widgets/widgets-brand/widgets-brand.component';
import { StatistiqueService } from '../../../services/statistique.service';
import { Statistique } from '../../../modele/Statistique';

import { CandidatEligibleComponent } from '../candidat-eligible/candidat-eligible.component';
import { CandidatInterresseComponent } from '../candidat-interresse/candidat-interresse.component';
import { TotalInscriptionConcoursComponent } from '../total-inscription-concours/total-inscription-concours.component';
import { StatistiqueAdmissionComponent } from '../statistique-admission/statistique-admission.component';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    NgFor,
    WidgetsDropdownComponent, 
    TextColorDirective, 
    CardComponent, 
    CardBodyComponent, 
    RowComponent,
    ColComponent, 
    ButtonDirective, 
    IconDirective, 
    ReactiveFormsModule, 
    ButtonGroupComponent, 
    FormCheckLabelDirective, 
    ChartjsComponent, 
    NgStyle, 
    CardFooterComponent, 
    GutterDirective, 
    ProgressBarDirective, 
    ProgressComponent, 
    WidgetsBrandComponent, 
    CardHeaderComponent, 
    TableDirective, 
    AvatarComponent,
    FormSelectDirective,
    FormsModule,
    CandidatEligibleComponent,
    CandidatInterresseComponent,
    TotalInscriptionConcoursComponent,
    StatistiqueAdmissionComponent
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent implements OnInit {

  listeStatistique: Statistique[] = [];
  listeAnnee: number[] = [];
  annee: number = 2024;

  constructor(private statistiqueservice: StatistiqueService) {}

  ngOnInit(): void {
    this.getAnnee();
    this.getData();
  }

  getData() {
    this.statistiqueservice.getStatEtudiants(this.annee!).subscribe(
      data => {
        this.listeStatistique = data;
      }
    )
  }

  getColorStatistique(id: number): string {
    if(id == 1) {
      return 'warning';
    }
    else if(id == 2) {
      return 'success';
    }
    else if(id == 3) {
      return 'danger';
    }
    else {
      return 'primary';
    }
  }

  getTitle(id: number): string {
    if(id == 1) {
      return 'Qui se sont manifestés';
    }
    else if(id == 2) {
      return 'Qui se sont inscrit au concours';
    }
    else if(id == 3) {
      return 'Qui ont été admis au concours';
    }
    else {
      return 'Qui sont inscrit définitivement';
    }
  }

  getAnnee() {
    this.statistiqueservice.getAnnee().subscribe(
      data => {
        this.listeAnnee = data;
      }
    )
  }

  filtre(event: any) {
    this.getData();
  }

}
