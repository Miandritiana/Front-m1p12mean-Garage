import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Personne } from '../modele/Personne';
import { Manifestation } from '../modele/Manifestation';
import { Observable } from 'rxjs';
import { Page } from '../modele/Page';

@Injectable({
  providedIn: 'root'
})
export class ManifestationService {

  private url = Constants.BASE_URL_2 + '/api/manifestation';

  constructor(private http: HttpClient) { }

  insertManifestation(personne: Personne, manifestation: Manifestation): Observable<any> {
    const body = { personne, manifestation };
    return this.http.post(this.url, body);
  }

  getListeManifestation(data: any): Observable<Page<Manifestation>> {
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
    return this.http.get<Page<Manifestation>>(`${this.url}/all${parametre}`);
  }

  updateManifestation(personne: Personne, manifestation: Manifestation): Observable<any> {
    const body = { personne, manifestation };
    return this.http.put(this.url, body);
  }

  sendEmail(idManifestation:number): Observable<any>{
    const url = `${this.url}/send-email?idManifestation=${idManifestation}`;
    return this.http.get< any>(url);
  }

  sendEmailsToMultipleStudents(etudiants: Manifestation[]): Observable<any> {
    return this.http.post(`${this.url}/send_multiple`, etudiants);
    }
}
