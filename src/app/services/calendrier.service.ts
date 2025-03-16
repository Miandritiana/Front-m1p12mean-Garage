import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Page } from '../modele/Page';
import { Calendrier } from '../modele/Calendrier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendrierService {
  private urlCalendrier = Constants.BASE_URL + '/calendrier';
  private urlCalendrierConcours = Constants.BASE_URL_2 + '/api/calendrier-concours';

  constructor(private http: HttpClient) { }

  getAll(data:any): Observable<Page<Calendrier>> {
    var parametre="";
    Object.entries(data).forEach(([key, value]) => {
      if(value!=null && value!==""){
        if(parametre===""){
          parametre=`?${parametre}`
        }
        else{
          parametre=parametre+"&";
        }
        parametre=`${parametre}${key}=${value}`;
      }
    });
    const url = `${this.urlCalendrierConcours}${parametre}`;
    return this.http.get< Page<Calendrier>>(url);
  }

  getAvenir(): Observable<Calendrier[]> {
    const url = `${this.urlCalendrier}/a_venir`;
    return this.http.get< Calendrier[]>(url);
  }

  insert(body:any){
    const url = `${this.urlCalendrier}`;
    
    return this.http.post< Page<Calendrier>>(url,body);
  }

  delete(id: number): Observable<Calendrier> {
    const url = `${this.urlCalendrier}/${id}`;
    return this.http.delete<Calendrier>(url);
  }

  update(id:number, body:any){
    const url = `${this.urlCalendrier}/${id}`;
    return this.http.put<Calendrier>(url, body);
  }

  ajouterCalendrierConcours(calendrierConcours : any) : Observable<any>{
    return this.http.post<any>(this.urlCalendrierConcours, calendrierConcours);
  }

  getCalendrierConcoursAVenir() : Observable<any>{
    return this.http.get<any[]>(`${this.urlCalendrierConcours}/all-a-venir`);
  }

  getAllCalendrier() : Observable<any>{
    return this.http.get<any[]>(`${this.urlCalendrierConcours}/all`);
  }

  saveMultiple(calendriers: any[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.urlCalendrierConcours}/save-multiple`, calendriers);
  }


}
