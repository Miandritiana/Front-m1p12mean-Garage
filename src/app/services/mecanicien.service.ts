import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MecanicienService {

  private url= Constants.BASE_URL;

  constructor(private http: HttpClient) { }

  tacheWithSearch(dateheure?: Date, avancement?: number, idmecanicien?: string): Observable<any[]> {
    const data: any = {}; // Initialize an empty object
  
    if (dateheure !== undefined) data.dateheure = dateheure;
    if (avancement !== undefined) data.avancement = avancement;
    if (idmecanicien !== undefined) data.idmecanicien = idmecanicien;
  
    return this.http.post<any[]>(`${this.url}/rendezvous/validesmecanicien`, data);
  }

  detailTache(idrendezvous: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/rendezvous/detailsdevis/${idrendezvous}`);
  }

  avancement(idrendezvous: string, idprestation: string) {
    const data = {
      idrendezvous: idrendezvous,
      idprestation: idprestation
    };
    return this.http.post<{
      nouveauAvancement: any; message: string 
    }>(`${this.url}/rendezvous/changeravancement`, data);
  }

  deletePrestation(idrendezvous: string, idprestation: string) {
    const data = {
      idrendezvous: idrendezvous,
      idprestation: idprestation
    };
    return this.http.delete<any>(`${this.url}/rendezvous/supprimerprestation`, { body: data });
  }

  prestationByModeleAndTypemoteur(modele: string, type: string) {
    return this.http.get<any>(`${this.url}/prestation/${modele}/${type}`);
  }

  addPrestation(idrendezvous: string, idprestation: string) {
    const data = {
      idrendezvous: idrendezvous,
      idprestation: idprestation
    };
    return this.http.post<any>(`${this.url}/rendezvous/ajouterprestation`, data);
  }

}
