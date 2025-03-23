import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url= Constants.BASE_URL;

  constructor(private http: HttpClient) { }

  rendezVousAttente(idClient: string): Observable<any> {
    const url = `${this.url}/rendezvous/enattente`;
    return this.http.get<any>(url, { params: { idClient } });
  }
  
}
