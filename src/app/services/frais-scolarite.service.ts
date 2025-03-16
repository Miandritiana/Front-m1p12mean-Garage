import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FraisScolarite } from '../modele/FraisScolarite';
import { FraisScolariteData } from '../modele/FraisScolariteData';

@Injectable({
  providedIn: 'root'
})
export class FraisScolariteService {

  private urlInsertionFraisScolarite = Constants.BASE_URL + '/frais_scolarite';
  private urlListeFraisScolarite = Constants.BASE_URL + '/frais_scolarite/liste';

  constructor(private http: HttpClient) { }

  /**
   * Service pour créer les frais de scolarite d'une année scolaire
   * @param fraisScolarite 
   * @returns 
   */
  insertionFraisScolarite(fraisScolarite: FraisScolarite[]): Observable<any>{
    return this.http.post<any>(`${this.urlInsertionFraisScolarite}`, fraisScolarite);
  }

  listeFraisScolarite(parametre: string | null): Observable<FraisScolariteData[]> {
    return this.http.get<FraisScolariteData[]>(`${this.urlListeFraisScolarite}`+parametre);
  }
  
}
