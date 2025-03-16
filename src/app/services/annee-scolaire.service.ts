import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../util/constants';
import { AnneeScolaire } from '../modele/AnneeScolaire';

@Injectable({
  providedIn: 'root'
})
export class AnneeScolaireService {

  private urlListeAnneeScolaire = Constants.BASE_URL + '/annee_scolaire';
  private urlAnneeScolaire = Constants.BASE_URL + '/annee_scolaire/en_cours';

  constructor(private http: HttpClient) { }

  listeAnneeScolaire(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.urlListeAnneeScolaire);
  }

  /**
   * Service pour avoir l'année scolaire en cours
   * @returns 
   */
  getAnneeScolaireEnCours(): Observable<AnneeScolaire> {
    return this.http.get<AnneeScolaire>(`${this.urlAnneeScolaire}`);
  }

  insertionAnneeScolaire(anneeScolaire: string): Observable<string> {
    return this.http.post(this.urlListeAnneeScolaire, { anneeScolaire }, { responseType: 'text' }) as Observable<string>;
  }
  
  getLastAnneeScolaire(): Observable<string> {
    return this.http.get(`${this.urlListeAnneeScolaire}/last`, { responseType: 'text' }) as Observable<string>;
  }

}
