import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandePrestationService {

  private url= Constants.BASE_URL;

  constructor(private http: HttpClient) { }

  getTypeMoteur(): any {
    return this.http.get<any>(this.url+'/typemoteur');
  }

  getModele(): any {
      return this.http.get<any>(this.url+'/modele');
  }

  getPrestation(idType: any, idModele: any): any {
    const url = `${this.url}/prestation/${idType}/${idModele}`;
    return this.http.get<any>(url);
  }
  

  
}
