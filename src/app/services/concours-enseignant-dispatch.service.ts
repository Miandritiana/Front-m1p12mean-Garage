import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { ConcoursEnseignantDispatch } from '../modele/ConcoursEnseignantDispatch';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConcoursEnseignantDispatchService {

  private url = Constants.BASE_URL_2 + '/api/concours/dispatch';

  constructor(private http: HttpClient) { }

  insertConcoursEnseignantDispatch(concoursDispatch: ConcoursEnseignantDispatch[]): Observable<any> {
    return this.http.post<any>(`${this.url}`, concoursDispatch);
  }
}
