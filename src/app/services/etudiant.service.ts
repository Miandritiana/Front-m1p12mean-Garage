import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../modele/Page';
import { Etudiant } from '../modele/Etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private urlEtudiant = Constants.BASE_URL + '/etudiant';

  constructor(private http: HttpClient) { }

  update(idEtudiant:number,body:any){
    const url = `${this.urlEtudiant}`;
    return this.http.put< Page<Etudiant>>(url+"/"+idEtudiant,body);
  }
  
  skip(body:any){
    const url = `${this.urlEtudiant}`;
    return this.http.post< Page<Etudiant>>(url+"/skip",body);
  }
  
  insert(body:any){
    const url = `${this.urlEtudiant}`;
    return this.http.post< Page<Etudiant>>(url,body);
  }
  
  getAll(data:any): Observable<Page<Etudiant>> {
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
    
    const url = `${this.urlEtudiant}${parametre}`;
    return this.http.get< Page<Etudiant>>(url);
  }

  sendEmail(idEtudiant:number): Observable<any>{
    const url = `${this.urlEtudiant}/send_email?idEtudiant=${idEtudiant}`;
    return this.http.get< any>(url);
  }

  getListeEtudiantAdmis(etat: string, page: number, size: number): Observable<Page<any>> {
    const params = new HttpParams()
      .set('etat', etat)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<any>>(`${this.urlEtudiant}/admis`, { params });
  }

   /**
   * Envoie des emails à plusieurs étudiants.
   * @param etudiants Liste des étudiants à qui envoyer les emails.
   * @returns Observable de la réponse du serveur.
   */
   sendEmailsToMultipleStudents(etudiants: Etudiant[]): Observable<any> {
    return this.http.post(`${this.urlEtudiant}/send_multiple`, etudiants);
  }


}
