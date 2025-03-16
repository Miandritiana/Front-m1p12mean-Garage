import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueEtatConcoursService {

   private apiUrl = Constants.BASE_URL_2 + '/api/historique_etat/concours';
  constructor(private http: HttpClient) { }

  getHistoriqueConcours(idConcours: number): Observable<any> {
    const url = `${this.apiUrl}/${idConcours}`;
    return this.http.get<any>(url);
  }
  


}
