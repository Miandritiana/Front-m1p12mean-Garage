import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parcours } from '../modele/Parcours';

@Injectable({
  providedIn: 'root'
})
export class ParcoursService {

  private urlParcours = Constants.BASE_URL_2 + '/api/parcours';

  constructor(private http: HttpClient) { }

  getListeParcours(idNiveau: number): Observable<Parcours[]> {
    return this.http.get<Parcours[]>(`${this.urlParcours}/all-niveau-parcours?idNiveau=${idNiveau}`);
  }
}
