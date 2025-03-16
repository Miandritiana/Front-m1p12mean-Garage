import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { Observable } from 'rxjs';
import {Engagement} from '../modele/Engagement'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EngagementService {

  private urlEngagement = Constants.BASE_URL + '/engagement';

  constructor(private http: HttpClient) { }

  getListeEngagement():Observable<Engagement[]>{
    const url = `${this.urlEngagement}/liste`;
    return this.http.get<Engagement[]>(url);
  }
}
