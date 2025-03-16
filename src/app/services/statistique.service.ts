import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../util/constants';
import { StatistiqueManifestation } from '../modele/StatistiqueManifestation';
import { StatistiqueDossier } from '../modele/StatistiqueDossier';
import { StatistiqueConcours } from '../modele/StatistiqueConcours';
import { StatistiqueAdmission } from '../modele/StatistiqueAdmission';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  private urlStatistiqueInscription = Constants.BASE_URL + '/api/statistique';
  private urlGetAnnee = Constants.BASE_URL + '/api/statistique/annee-existant';
  private url = Constants.BASE_URL_2 + '/api/statistique';

  constructor(private http: HttpClient) { }

  getStatEtudiants(annee: number): Observable<any> {
    return this.http.get<any>(`${this.urlStatistiqueInscription}/stat-etudiant?annee = ${annee}`)
  }

  getAnnee(): Observable<number[]> {
    return this.http.get<number[]>(`${this.urlGetAnnee}`)
  }

  getStatistiqueManifestation(): Observable<StatistiqueManifestation> {
    return this.http.get<StatistiqueManifestation>(`${this.url}/manifestation`);
  }

  getStatistiqueConcours(): Observable<StatistiqueConcours> {
    return this.http.get<StatistiqueConcours>(`${this.url}/concours`);
  }

  getStatistiqueDossier(): Observable<StatistiqueDossier> {
    return this.http.get<StatistiqueDossier>(`${this.url}/dossier`);
  }

  getStatistiqueAdmission(): Observable<StatistiqueAdmission> {
    return this.http.get<StatistiqueAdmission>(`${this.url}/admission`);
  }

}
