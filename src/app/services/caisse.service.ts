import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Caisse } from '../modele/Caisse';

@Injectable({
  providedIn: 'root'
})
export class CaisseService {

  private url = Constants.BASE_URL_2 + '/api/caisse';

  constructor(private http: HttpClient) { }

  getListeCaisse(): Observable<Caisse[]> {
    return this.http.get<Caisse[]>(`${this.url}/all`);
  }

}
