import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../modele/LoginRequest';
import { LoginResponse } from '../modele/LoginResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlAuth = Constants.BASE_URL_2 + '/api/auth'
  private urlAuth2 = Constants.BASE_URL_2 + '';

  constructor(private http: HttpClient) { }

  login(infos : LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.urlAuth+'/login', infos);
  }

  
}
