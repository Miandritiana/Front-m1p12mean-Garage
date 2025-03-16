import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { Enseignant } from '../modele/Enseignant';
import { Page } from '../modele/Page';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  private url = Constants.BASE_URL + '/enseignant';
  private urlEnseignant = Constants.BASE_URL_2 + '/api/enseignant';

  constructor(private http: HttpClient) { }
   
  getAll(data:any): Observable<Page<Enseignant>> {
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
    
    const url = `${this.url}${parametre}`;
    console.log(url);
    return this.http.get< Page<Enseignant>>(url);
  }
  
  getListeEnseignant(): Observable<Enseignant[]>  {
    return this.http.get< Enseignant[]>(`${this.urlEnseignant}/all`);
  }
  
  get(): Observable<Enseignant[]> {
    const url = `${this.url}/all`;
    return this.http.get< Enseignant[]>(url);
  }

  
  insert(body:any){
    const url = `${this.url}/diponiblite`;
    return this.http.post< Page<Enseignant[]>>(url,body);
  }

  getListeDisponibilteEnseignants(size: number, page: number, parametre: string | null): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.url}/liste-disponibilite?page=${size}&size=${page}`+parametre , 
      { observe: 'response' });
  }



}
