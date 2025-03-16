import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../modele/LoginRequest';
import { LoginResponse } from '../modele/LoginResponse';
import { Inscription } from '../modele/Inscription';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlInscription = Constants.BASE_URL + '/users/inscription'
  private urlLogin= Constants.BASE_URL + '/users';

  constructor(private http: HttpClient) { }

  login(infos : LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.urlLogin+'/login', infos);
  }

  inscrire(infos: Inscription): void {
    this.http.post<Inscription>(this.urlInscription, infos).subscribe({
      next: (response) => {
        console.log('Inscription réussie:', response);
      },
      error: (error) => {
        console.error('Erreur lors de l’inscription:', error);
      }
    });
  }

  
}
