import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Niveau } from '../modele/Niveau';
import { NiveauTypeFormation } from '../modele/NiveauTypeFormation';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  private urlNiveau= Constants.BASE_URL + '/niveau';
  private url = Constants.BASE_URL_2 + '/api/niveau';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Niveau[]> {
    const url = `${this.urlNiveau}/all`;
    return this.http.get< Niveau[]>(url);
  }

  getListeNiveau(idTypeFormation: number): Observable<NiveauTypeFormation[]> {
    let urlSuite = idTypeFormation!=0? "all?idTypeFormation="+idTypeFormation : "all"
    return this.http.get<NiveauTypeFormation[]>(`${this.url}/${urlSuite}`);
  }

}
