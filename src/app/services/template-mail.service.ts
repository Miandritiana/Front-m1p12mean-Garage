import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../modele/Page';
import { TemplateMail } from '../modele/templateMail';
import { HistoriqueCorpsMail } from '../modele/HistoriqueCorpsMail';
import { ViewHistoriqueCorpsMail } from '../modele/ViewHistoriqueCorpsMail';

@Injectable({
  providedIn: 'root'
})
export class TemplateMailService {
  private url = Constants.BASE_URL_2 + '/api/template/mail';

  constructor(private http: HttpClient) { }

  getAll(data:any): Observable<Page<TemplateMail>> {
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
      return this.http.get< Page<TemplateMail>>(url);
  }

  
    get(id:number): Observable<TemplateMail> {
      const url = `${this.url}/${id}`;
      return this.http.get<TemplateMail>(url);
    }

    
  insert(body:any){
    const url = `${this.url}`;
    return this.http.post<TemplateMail>(url,body);
  }


  getAllHistoriqueCorpsMails(page: number, size: number, idTemplateMail : number | undefined): Observable<Page<HistoriqueCorpsMail>> {
    return this.http.get<Page<ViewHistoriqueCorpsMail>>(`${this.url}/historique_corps_mail/${idTemplateMail}?page=${page}&size=${size}`);
  }

  restaurerMail(idCorpsMail: number, idPat: number | undefined): Observable<any> {
    return this.http.post<any>(`${this.url}/restaurer/${idCorpsMail}/${idPat}`, {});
  }





}
