import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProgrammeConcours} from '../modele/programmeConcours'
import { CalendrierDispatch } from '../modele/CalendrierDispatch';


@Injectable({
  providedIn: 'root'
})
export class ProgrammeService {
  private url = Constants.BASE_URL_2 + '/api/programme-concours';

  constructor(private http: HttpClient) { }
 
  getAll():Observable<ProgrammeConcours[]>{
    const url = `${this.url}/a-venir`;
    return this.http.get<ProgrammeConcours[]>(url);
  }

  
    getCalendrierConcoursDispatch(idCalendrier:number):Observable<CalendrierDispatch[]>{
      const url = `${this.url}/${idCalendrier}`;
      return this.http.get<CalendrierDispatch[]>(url);
  
    }
}
