import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemandePrestationService } from 'src/app/services/demande-prestation.service';
import { NgIf, NgFor } from '@angular/common';


@Component({
  selector: 'app-info-vehicule',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './info-vehicule.component.html',
  styleUrl: './info-vehicule.component.scss'
})
export class InfoVehiculeComponent implements OnInit {

  ngOnInit(): void {
    this.getTypeMoteur();
    this.getModele();
  }

  check = false;
  form: FormGroup;
  typeMoteur: any;
  modele: any;
  currentStep: number = 1;
  @Output() messageEvent = new EventEmitter<number>();
  @Output() dataEvent = new EventEmitter<any>();


  constructor(
    private formBuilder: FormBuilder,
    private demandePrestationService: DemandePrestationService
  )
  {
    this.form = this.formBuilder.group({
      immatriculation: ['', [Validators.required]],
      idType: ['', [Validators.required]],
      idModele: ['', [Validators.required]],
    });

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

  isInfoPersoValid() {
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });
  
    return (
      this.form.get('immatriculation')?.valid &&
      this.form.get('idType')?.valid &&
      this.form.get('idMarque')?.valid
    );
  }
  
  firstStep() {
  
    if (this.form.valid) {
  
      this.currentStep = 2;
      this.messageEvent.emit(this.currentStep);
      this.dataEvent.emit(this.form.value);
    } else {
      console.log('Form is invalid:', this.form.errors); // Debugging invalid form
    }
  }
  
  

  public getTypeMoteur() {
    this.demandePrestationService.getTypeMoteur().subscribe((data: any) => {
      this.typeMoteur = data;
    })
  }

  public getModele() {
    this.demandePrestationService.getModele().subscribe((data: any) => {
      this.modele = data;
    })
  }
}
