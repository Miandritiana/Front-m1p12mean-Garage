import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url= Constants.BASE_URL;

  constructor(private http: HttpClient) { }

  rendezVousAttente(idclient: string): Observable<any> {
    const url = `${this.url}/rendezvous/enattente`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    const body = { idclient };
  
    // Log the full request details
    console.log('🔹 Sending Request:');
    console.log('➡️ URL:', url);
    console.log('📩 Headers:', headers.keys().map(h => ({ [h]: headers.get(h) })));
    console.log('📦 Body:', JSON.stringify(body, null, 2));
  
    return this.http.request<any>('GET', url, { headers, body });
  }
  


  
}
