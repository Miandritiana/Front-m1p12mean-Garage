import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemandePrestationService } from '../../../services/demande-prestation.service';
import { NgIf, NgFor } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-votre-devis',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './votre-devis.component.html',
  styleUrl: './votre-devis.component.scss'
})
export class VotreDevisComponent implements OnChanges {

  form: FormGroup;
  check = false;
  @Output() messageEvent = new EventEmitter<number>();
  @Output() dataEvent = new EventEmitter<any>();
  prestations: any;
  @Input() dataInfoVehicule: any;
  @Input() idType: any;
  @Input() idModele: any;

  constructor(
    private formBuilder: FormBuilder,
    private demandePrestationService: DemandePrestationService
  )
  {
    this.form = this.formBuilder.group({
      idPrestation: ['', [Validators.required]],
    });

  }  
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['idType'] || changes['idModele']) {
      console.log("Data received in VotreDevisComponent:", this.idType, this.idModele);
      this.getPrestation(this.idType, this.idModele);
    }
  }

  public getFormSelectClass(name: string) {
    return 'form-select ' + (this.isValide('nom') ? 'is-invalid' : '');
  }

  public getFormClass(name: string) {
    return 'form-control ' + (this.isValide('nom') ? 'is-invalid' : '');
  }

  public isValide(name: string): boolean {
    const control = this.form.get(name);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  public isRequired(name: string): boolean {
    const control = this.form.get(name);
    return !!(control && control?.errors?.["required"] && (control.dirty || control.touched));
  }  

  getPrestation(idType: any, idModele: any) {

    if (!idType || !idModele) {
      return;  // Stop further execution if validation fails
    }

    this.demandePrestationService.getPrestation(idType, idModele).subscribe({
      next: (data: any) => {

        console.log(data);
        
        if (Array.isArray(data) && data.length > 0) {
          this.prestations = [];
  
          // Loop through the prestations array and map the required data
          data.forEach((item: any) => {
            this.prestations.push({
              _id: item._id,
              nom: item.nom,
              typemoteur: item.typemoteur,  // Get 'typemoteur' from each item
              modele: item.modele,          // Get 'modele' from each item
              categorieprestation: item.categorieprestation,
              prixunitaire: item.prixunitaire
            });
          });
  
          console.log("Transformed Prestation:", this.prestations); // Check the transformed data structure
        } else {
          console.error("Invalid data format or data is empty:", data);
        }

      },
      error: (err: any) => {
        console.error("Error fetching prestation:", err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: err?.error.message || "Une erreur s'est produite lors de la récupération des prestations.",  // Show error message from API
        });
      }
    });
  }
  

  formatPrestations(data: any[]): any {
    if (!data || data.length === 0) return { data: [] };
  
    // Extract typemoteur and modele
    const typemoteur = data.length > 0 ? data[0].typemoteur : null;
    const modele = data.length > 0 ? data[0].modele : null;
  
    // Group prestations by categorieprestation
    const groupedPrestations = data.reduce((acc, item) => {
      const { categorieprestation, _id, nom, prixunitaire } = item;
  
      if (!acc[categorieprestation]) {
        acc[categorieprestation] = {
          categorieprestation,
          prestations: []
        };
      }
  
      acc[categorieprestation].prestations.push({ _id, nom, prixunitaire });
      return acc;
    }, {});
  
    return {
      data: [
        { typemoteur, modele },
        ...Object.values(groupedPrestations)
      ]
    };
  }
  

  isInfoPersoValid() {
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });
  
    return (
      this.form.get('idPrestation')?.valid
    );
  }

  previous(): void {
    this.messageEvent.emit(1);
  }

  next(): void {
    this.check = true;
    if (this.form.valid) {
      this.messageEvent.emit(3);
      this.dataEvent.emit(this.form.value);
    } else {
      console.log('Formulaire non valide');
    }
  }

}
