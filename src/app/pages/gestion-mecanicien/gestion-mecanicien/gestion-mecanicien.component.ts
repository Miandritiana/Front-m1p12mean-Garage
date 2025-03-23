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
  TableDirective
} from '@coreui/angular';
import { CrudMecanicienService } from 'src/app/services/crud-mecanicien.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-mecanicien',
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
    NgFor, NgStyle, NgIf,
    TableDirective,
    FormsModule
  ],
  templateUrl: './gestion-mecanicien.component.html',
  styleUrl: './gestion-mecanicien.component.scss'
})
export class GestionMecanicienComponent implements OnInit {

  mecaniciens: any[] = [];
  filters = { id: '', nom: '', prenom: '', email: '', telephone: '' };

  constructor(private mecanicienService: CrudMecanicienService) {}

  ngOnInit() {
    this.loadMecaniciens();
  }

  loadMecaniciens() {
    this.mecanicienService.getMecaniciens().subscribe(data => {
      this.mecaniciens = data;
    });
  }

  get filteredMecaniciens() {
    return this.mecaniciens.filter(mecanicien => 
      (!this.filters.id || mecanicien.id.toString().includes(this.filters.id)) &&
      (!this.filters.nom || mecanicien.nom.toLowerCase().includes(this.filters.nom.toLowerCase())) &&
      (!this.filters.prenom || mecanicien.prenom.toLowerCase().includes(this.filters.prenom.toLowerCase())) &&
      (!this.filters.email || mecanicien.email.toLowerCase().includes(this.filters.email.toLowerCase())) &&
      (!this.filters.telephone || mecanicien.telephone.includes(this.filters.telephone))
    );
  }

  addMecanicien() {
    const newMecanicien = { 
      nom: 'Nouveau', 
      prenom: 'Mecanicien', 
      email: 'new@example.com', 
      telephone: '0340011122' 
    };
    this.mecanicienService.addMecanicien(newMecanicien).subscribe(() => {
      this.loadMecaniciens();
    });
  }

  editMecanicien(mecanicien: any) {
    const updatedMecanicien = { ...mecanicien, nom: 'Modifié' };
    this.mecanicienService.modifierMecanicien(mecanicien.id, updatedMecanicien).subscribe(() => {
      this.loadMecaniciens();
    });
  }

  deleteMecanicien(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce mécanicien ?')) {
      // Call delete service when implemented
      this.mecaniciens = this.mecaniciens.filter(m => m.id !== id);
    }
  }

}
