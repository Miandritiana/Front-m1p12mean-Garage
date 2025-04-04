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
import { CrudMecanicienService } from './../../../services/crud-mecanicien.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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
  newMecanicien = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    mdp: ''
  };

  constructor(private mecanicienService: CrudMecanicienService) {}

  ngOnInit() {
    this.loadMecaniciens();
  }

  loadMecaniciens() {
    this.mecanicienService.getMecaniciens().subscribe(data => {
      this.mecaniciens = data;
    });
  }

  addMecanicien() {
    if (!this.newMecanicien.nom || !this.newMecanicien.prenom || !this.newMecanicien.email || 
        !this.newMecanicien.telephone || !this.newMecanicien.mdp) {
  
      Swal.fire({
        icon: 'warning',
        title: 'Champs requis!',
        text: 'Veuillez remplir tous les champs.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }
  
    this.mecanicienService.addMecanicien(this.newMecanicien).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Succès!',
        text: 'Le mécanicien a été ajouté avec succès.',
        confirmButtonColor: '#28a745'
      });
  
      this.loadMecaniciens(); // Reload the list
      this.resetForm(); // Reset the form after submission
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Une erreur s\'est produite lors de l\'ajout du mécanicien.',
        confirmButtonColor: '#d33'
      });
    });
  }

  resetForm() {
    this.newMecanicien = {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      mdp: ''
    };
  }

  editMecanicien(mecanicien: any) {
    // const updatedMecanicien = { ...mecanicien, nom: 'Modifié' };
    // this.mecanicienService.modifierMecanicien(mecanicien.id, updatedMecanicien).subscribe(() => {
    //   this.loadMecaniciens();
    // });
  }

  deleteMecanicien(id: string) {
    // if (confirm('Êtes-vous sûr de vouloir supprimer ce mécanicien ?')) {
    //   // Call delete service when implemented
    // }
  }

}
