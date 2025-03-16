import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeFormation } from '../modele/TypeFormation';

@Injectable({
  providedIn: 'root'
})
export class TypeFormationService {

  private url = Constants.BASE_URL_2 + '/api/type-formation';

  constructor(private http: HttpClient) { }

  getListeTypeFormation(): Observable<TypeFormation[]> {
    return this.http.get<TypeFormation[]>(`${this.url}/all`);
  }
}
