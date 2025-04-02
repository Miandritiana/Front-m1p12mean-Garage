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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      motDePasse: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData: LoginRequest = {
      email: this.loginForm.value.login,
      mdp: this.loginForm.value.motDePasse,
    };

    this.authService.login(loginData).subscribe(
      (response: LoginResponse) => {
        // Handle successful login (e.g., store token, navigate)
        console.log('Login successful:', response);
        this.localStorageService.storeLoginInfo(response);

        const role=this.localStorageService.getLoginInfo()?.role ?? '';
        
        const defaultRoutes: Record<string, string> = {
          "1": '/acceuil',
          "2": '/tache',
          "3": '/demande-prestation-manager'
        };
    
        const redirectTo = defaultRoutes[role] || '/acceuil';
    
        this.router.navigate([redirectTo]);

      },
      (error: HttpErrorResponse) => {
        // Handle error (e.g., show error message)
        console.error('Login failed:', error.error.message);
        this.errorMessage = error.error.message;
        
      }
    );
  }


  goInscription() {
    this.router.navigate(['/inscription']);
  }
}
