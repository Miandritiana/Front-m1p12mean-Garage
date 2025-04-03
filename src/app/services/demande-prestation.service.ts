import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandePrestationService {

  private url= Constants.BASE_URL;

  constructor(private http: HttpClient) { }

  getTypeMoteur(): any {
    return this.http.get<any>(this.url+'/typemoteur');
  }

  getModele(): any {
      return this.http.get<any>(this.url+'/modele');
  }

  getPrestation(idType: any, idModele: any): any {
    const url = `${this.url}/prestation/${idType}/${idModele}`;
    console.log(url);
    
    return this.http.get<any>(url);
  }
  
  demandeDevis(immatriculation: any, idType: any, idModele: any, idClient: any, idPrestations: string[]): Observable<any> {
    const data = {
      immatriculation, 
      idtypemoteur: idType, 
      idmodele: idModele, 
      idclient: idClient, 
      idprestations: idPrestations
    };
    console.log(data);
    
    return this.http.post<any>(this.url+'/devis', data);
  }

  acceptezDevis(idDevis: any): Observable<any> {
    const url = `${this.url}/devis/accepter/${idDevis}`;
    return this.http.post(url, {});  // Assuming you're making a POST request, adjust if necessary
  }


  demandeRendezVous(idDevis: any, propositionDates: any[], infoSupp: string): Observable<any> {
    const url = `${this.url}/rendezvous`;
    const data = { iddevis: idDevis, propositiondates: propositionDates, infosup: infoSupp };
    return this.http.post(url, data, { observe: 'response' });  // Assuming you're making a POST request, adjust if necessary
  }

  
}
