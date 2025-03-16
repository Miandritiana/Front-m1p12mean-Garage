import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Page } from '../modele/Page';
import { Sujet } from '../modele/Sujet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SujetService {
  private urlSujet = Constants.BASE_URL_2 + '/api/sujet';

  constructor(private http: HttpClient) { }
  
  update(idSujet:number,body:any){
    const url = `${this.urlSujet}`;
    return this.http.put<Sujet>(url+"/"+idSujet,body);
  }

  insert(body:any){
    const url = `${this.urlSujet}`;
    return this.http.post<Sujet>(url,body);
  }
  
  getAll(data:any): Observable<Page<Sujet>> {
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
    
    const url = `${this.urlSujet}${parametre}`;
    return this.http.get<Page<Sujet>>(url);
  }
  
  get(idSujet:number): Observable<Sujet> {
    const url = `${this.urlSujet}/${idSujet}`;
    return this.http.get< Sujet>(url);
  }

}
