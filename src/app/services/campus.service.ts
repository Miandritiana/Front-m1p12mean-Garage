import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampusService {
   private urlCampus = Constants.BASE_URL_2 + '/api/campus';

  constructor(private http: HttpClient) { }

  getCampus(): Observable<any> {
    return this.http.get<any>(`${this.urlCampus}/all`);
  }


}
