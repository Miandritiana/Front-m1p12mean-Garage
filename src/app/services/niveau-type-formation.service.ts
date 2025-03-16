import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NiveauTypeFormation } from '../modele/NiveauTypeFormation';
import { TypeFormation } from '../modele/TypeFormation';

@Injectable({
  providedIn: 'root'
})
export class NiveauTypeFormationService {

  private urlListeNiveauTypeFormation = Constants.BASE_URL + '/niveau_type_formation';

  constructor(private http: HttpClient) { }

  /**
   * Service pour avoir la liste des niveau type formation
   * @returns 
   */
  getListeNiveauTypeFormation(): Observable<NiveauTypeFormation[]> {
    return this.http.get<NiveauTypeFormation[]>(`${this.urlListeNiveauTypeFormation}/liste`);
  }

  getTypeFromation() : Observable<TypeFormation[]> {
    return this.http.get<NiveauTypeFormation[]>(`${this.urlListeNiveauTypeFormation}/type-formation`);
  }

  getListeNiveauParCursus(nomTypeFormation : string) : Observable<any> {
    return this.http.get<any>(`${this.urlListeNiveauTypeFormation}/${nomTypeFormation}`);
  }


}
