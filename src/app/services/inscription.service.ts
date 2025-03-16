import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private urlInscription = Constants.BASE_URL + '/inscription';

  constructor(private http: HttpClient) { }

  inscriptionDefinitive(body:any): Observable<any>{
    const url = `${this.urlInscription}`;
    return this.http.post<any>(url+"/insertion", body);
  }

  getListeEtudiantInscrit(size: number, page: number, parametre: string | null): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.urlInscription}/inscription-definitive?page=${size}&size=${page}`+parametre , 
      { observe: 'response' });
  }
}
