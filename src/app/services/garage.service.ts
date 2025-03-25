import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GarageService {

  private url= Constants.BASE_URL;
  constructor(private http: HttpClient) { }

  getNotification(idClient: string): Observable<any> {
    const url = `${this.url}/notifications/${idClient}`;
    return this.http.get<any>(url);
  }
  
}
