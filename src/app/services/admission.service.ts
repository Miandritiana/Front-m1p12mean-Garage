import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EffectifAdmis } from '../modele/effectifAdmis';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {
private url = Constants.BASE_URL + '/admission';
  constructor(private http: HttpClient) { }

   listeEffectifAdmi(): Observable<HttpResponse<EffectifAdmis>> {
      return this.http.get<any>(this.url+'/effectif/admis');
    }
  
}