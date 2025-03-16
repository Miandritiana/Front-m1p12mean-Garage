import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ville } from '../modele/Ville';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  private urlVille = Constants.BASE_URL_2 + '/api/ville';

  constructor(private http: HttpClient) { }

  getListeVille(): Observable<Ville[]> {
    return this.http.get<Ville[]>(`${this.urlVille}/all`);
  }

  insertVille(ville: Ville): Observable<Ville> {
    return this.http.post<Ville>(`${this.urlVille}`, ville);
  }
}
