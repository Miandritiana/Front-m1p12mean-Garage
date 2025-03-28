import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../modele/Client';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private url= Constants.BASE_URL;
  constructor(private http: HttpClient) { }

  rendezVousEnAttente(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.url}/rendezvous/avalider`);
  }
}
