import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import {NoteConcours} from '../modele/NoteConcours'
import {TotalNoteConcours} from '../modele/TotalNoteConcours'
import {DetailNoteConcours} from '../modele/DetailNoteConcours';
import { Observable } from 'rxjs';
import { Page } from '../modele/Page';
import { NoteData } from '../modele/NoteData';
import { LocalStorageService } from './local-storage.service';
import { NoteConcoursDetailler } from '../modele/NoteConcoursDetailler';
@Injectable({
  providedIn: 'root'
})
export class NoteConcoursService {
  private urlNoteConcours = Constants.BASE_URL_2 + '/api/note/concours';

  constructor(private http: HttpClient,
        private localStorageService : LocalStorageService,
    
  ) { }

  getDataSaisieEntretien(idConcours:number): Observable<NoteData> {
    const url = `${this.urlNoteConcours}/data/entretien/${idConcours}`;
    return this.http.get<NoteData>(url);
  }

  
  getDataSaisie(idConcours:number): Observable<NoteData> {
    const url = `${this.urlNoteConcours}/data/${idConcours}`;
    return this.http.get<NoteData>(url);
  }

  getDataSaisieEssai(idConcours:number): Observable<{noteConcours:NoteConcours,detailNote:DetailNoteConcours[]}> {
    const url = `${this.urlNoteConcours}/data/essai/${idConcours}`;
    return this.http.get<{noteConcours:NoteConcours,detailNote:DetailNoteConcours[]}>(url);
  }


  insertEntretient(body:any){
    const url = `${this.urlNoteConcours}/entretien`;
    return this.http.post<any>(url,body);
  }

  insert(body:any){
    const url = `${this.urlNoteConcours}`;
    return this.http.post<any>(url,body);
  }
  
  insertValider(body:any){
    const url = `${this.urlNoteConcours}/enregistrer/valider`;
    return this.http.post<any>(url,body);
  }

  
  valider(idNoteConcours:number):Observable<NoteConcours>{
    var idPersonne=this.localStorageService.getIdUtilisateur();
    const url = `${this.urlNoteConcours}/valider/${idNoteConcours}?idPersonne=${idPersonne}`;
    return this.http.get<NoteConcours>(url);
  }

  insertEssai(body:any){
    const url = `${this.urlNoteConcours}/essai`;
    return this.http.post<any>(url,body);
  }

  getAllResultat(data:any): Observable<Page<TotalNoteConcours>> {
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
    const url = `${this.urlNoteConcours}/resultat${parametre}`;
    console.log(url);
    return this.http.get< Page<TotalNoteConcours>>(url);
  }

  getEntretienValide(data:any):Observable<Page<NoteConcoursDetailler>>{
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
      const url = `${this.urlNoteConcours}/valider${parametre}`;
      return this.http.get<Page<NoteConcoursDetailler>>(url);
  
    }
}
