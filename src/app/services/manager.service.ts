import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../modele/Client';
import { Mecanicien } from '../modele/Mecanicien';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private url= Constants.BASE_URL;
  constructor(private http: HttpClient) { }

  rendezVousEnAttente(): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.url}/rendezvous/avalider`);
  }

  mecaniciensDispo(date: Date): Observable<Mecanicien[]>{
    return this.http.get<Mecanicien[]>(`${this.url}/rendezvous/mecaniciens/${date}`);
  }

  rendezVousValider(idrendezvous: string, datevalide: Date | null, idmecanicien: string | '', idclient: string): any {
    const data = { idrendezvous: idrendezvous, datevalide: datevalide, idmecanicien: idmecanicien, idclient: idclient };
    return this.http.post<any>(`${this.url}/rendezvous/valider`, data);
  }

  proposeDate(idrendezvous: string, nouvelleDate: Date | null, idmecanicien: string | '', idclient: string): any {
    const data = {
      idrendezvous: idrendezvous,
      nouvelleDate: nouvelleDate,
      idmecanicien: idmecanicien,
      idclient: idclient
    }
    return this.http.post<any>(`${this.url}/rendezvous/proposer`, data);
  }
  
  histoRdvValider(dateheure?: Date, avancement?: number) {
    const data: any = {}; // Initialize an empty object
  
    if (dateheure) {
      data.dateheure = dateheure;
    }
    if (avancement !== undefined) {
      data.avancement = avancement;
    }
  
    return this.http.post<any>(`${this.url}/rendezvous/valides`, data);
  }

  histoRdvDetail(idrendezvous: string) {
    return this.http.get<any>(`${this.url}/rendezvous/detailsdevis/${idrendezvous}`);
  }
  
}
