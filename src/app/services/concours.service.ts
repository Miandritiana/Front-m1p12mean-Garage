import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { Page } from '../modele/Page';
import { DossierConcoursDTO } from '../modele/DossierConcoursDTO';
import { Concours } from '../modele/Concours';
import { NoteConcoursDetailler } from '../modele/NoteConcoursDetailler';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import {NbrParticipantConcours} from '../modele/NbrParticipantConcours'
import {Calendrier} from '../modele/Calendrier'
import {CalendrierConcours} from '../modele/CalendrierConcours'
import {CalendrierDispatch} from '../modele/CalendrierDispatch'
import { DossierConcours } from '../modele/DossierConcours';

@Injectable({
  providedIn: 'root'
})
export class ConcoursService {
  private urlConcours = Constants.BASE_URL + '/concours';
  private urlInscription = Constants.BASE_URL_2 + '/api/concours';

  constructor(private http: HttpClient) { }


  get(idConcours:number): Observable<DossierConcoursDTO> {
    const url = `${this.urlInscription}/${idConcours}`;
    return this.http.get<DossierConcoursDTO>(url);
  }

  getAll(data:any): Observable<Page<Concours>> {
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
     
    const url = `${this.urlInscription}/gestion-dossier${parametre}`;
    return this.http.get< Page<Concours>>(url);

  }

  refuser(idConcours:number):Observable<Concours>{
    const url = `${this.urlConcours}/refuser/${idConcours}`;
    return this.http.get<Concours>(url);
  }

  annulerRefus(idConcours:number):Observable<Concours>{
    const url = `${this.urlConcours}/annuler-refus/${idConcours}`;
    return this.http.get<Concours>(url);
  }

  validerDE(idConcours:number, idPersonne?:number, dossierConcours?: DossierConcours[]):Observable<any>{
    const url = `${this.urlInscription}/valider-DE/${idConcours}/${idPersonne}`;
    return this.http.put<any>(url, dossierConcours);
  }

  validerRecouvrement(idConcours: number, idTiers:number, typeTiers: number):Observable<Concours>{
    const url = `${this.urlInscription}/valider/recouvrement/${idConcours}?idTiers=${idTiers}&typeTiers=${typeTiers}`;
    return this.http.put<Concours>(url, null);
  }

  validerMultiple(idConcours: number[], idTiers?: number, typeTiers?: number): Observable<Concours> {
    const url = `${this.urlConcours}/valider`;
    
    let params = new HttpParams().set('ids', idConcours.join(','));
  
    if (idTiers !== undefined) {
      params = params.set('idTiers', idTiers.toString());
    }
    if (typeTiers !== undefined) {
      params = params.set('typeTiers', typeTiers.toString());
    }
  
    return this.http.get<Concours>(url, { params });
  }
  
  getNbrParticipant(data:any):Observable<Page<NbrParticipantConcours>>{
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
    const url = `${this.urlConcours}/programme/entretient${parametre}`;
    return this.http.get< Page<NbrParticipantConcours>>(url);

  }

  
  getCalendrierConcours(data:any):Observable<Page<Calendrier>>{
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
    const url = `${this.urlConcours}/calendrier${parametre}`;
    return this.http.get< Page<Calendrier>>(url);

  }
  
  getCalendrierDispatch(data:any):Observable<{liste:CalendrierConcours[], calendrier:Calendrier}>{
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
    const url = `${this.urlConcours}/dispatch${parametre}`;
    return this.http.get< {liste:CalendrierConcours[], calendrier:Calendrier}>(url);
  }
  
  getCalendrierDispatchCloturer(idCalendrier:number):Observable<{liste:CalendrierConcours[], calendrier:Calendrier}>{
    const url = `${this.urlConcours}/dispatch/cloturer/${idCalendrier}`;
    return this.http.get< {liste:CalendrierConcours[], calendrier:Calendrier}>(url);
  }
  
  getEntretienAvenir(data:any):Observable<Page<Concours>>{
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
    const url = `${this.urlInscription}/a-note${parametre}`;
    return this.http.get<Page<Concours>>(url);

  }

  

  getEssaiNonCoriger(data:any):Observable<Page<Concours>>{
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
    const url = `${this.urlConcours}/essais/pas_note${parametre}`;
    return this.http.get<Page<Concours>>(url);

  }

  accepterConcours(idConcours: number): Observable<any> {
    const url = `${this.urlConcours}/accepter/${idConcours}`;
    return this.http.put(url, null); // `null` car aucun corps de requête n'est nécessaire
  }

  refuserConcours(idConcours: number): Observable<any> {
    const url = `${this.urlConcours}/refuser/${idConcours}`;
    return this.http.put(url, null); // `null` car aucun corps de requête n'est nécessaire
  }

  getListeAdmis(size: number, page: number, parametre: string | null): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.urlConcours}/admis?size=${size}&page=${page}`+parametre , 
      { observe: 'response' });
  }

  getListeFiliere() : Observable<any> {
    return this.http.get<any>(`${this.urlConcours}/filiere`);
  }

  getListeNiveau() : Observable<any> {
    return this.http.get<any>(`${this.urlConcours}/niveau`);
  }

  insertSalle(body:any){
    const url = `${this.urlConcours}/salle/url`;
    return this.http.post< Page<string>>(url,body);
  }

  getAllNouveau(data:any): Observable<Page<any>> {
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
     
    const url = `${this.urlInscription}${parametre}`;
    return this.http.get< Page<Concours>>(url);

  }

}