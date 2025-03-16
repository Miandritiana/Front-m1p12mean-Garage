import { NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/local-storage.service';
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
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { LoginRequest } from 'src/app/modele/LoginRequest';
import { Constants } from 'src/app/util/constants';
import { LoginResponse } from 'src/app/modele/LoginResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { Inscription } from 'src/app/modele/Inscription';

@Component({
  selector: 'app-inscription',
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
    IconDirective,
    NgIf,
    NgStyle,
    ReactiveFormsModule
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent implements OnInit {

  inscriptionForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {
    this.inscriptionForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^03[2-9]\s\d{2}\s\d{3}\s\d{2}$/)]],
      mdp: ['', Validators.required],
    });
  }

  ngOnInit(): void {  }

  onInscription(){
    const inscription: Inscription = this.inscriptionForm.value;
    console.log(inscription);
    
    this.authService.inscrire(inscription);
    this.router.navigate(['/login']);
  }

}
