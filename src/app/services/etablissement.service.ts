import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etablissement } from '../modele/Etablissement';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  private url = Constants.BASE_URL_2 + '/api/etablissement';

  constructor(private http: HttpClient) { }

  getListeEtablissement(): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(`${this.url}/all`);
  }

  insertEtablissement(etablissement: Etablissement): Observable<Etablissement> {
    return this.http.post<Etablissement>(`${this.url}`, etablissement);
  }
}
