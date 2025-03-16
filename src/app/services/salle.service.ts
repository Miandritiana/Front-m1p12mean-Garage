import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salle } from '../modele/Salle';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  private url = Constants.BASE_URL_2 + '/api/salle';

  constructor(private http: HttpClient) { }

  getListeSalle(idCampus: number): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${this.url}/all?idCampus=${idCampus}`);
  }
}
