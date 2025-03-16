import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TypeParent} from '../modele/TypeParent'

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  private urlParent = Constants.BASE_URL + '/parent';

  constructor(private http: HttpClient) { }

  getListeTypeParent():Observable<TypeParent[]>{
    const url = `${this.urlParent}/type-parent`;
    return this.http.get<TypeParent[]>(url);
  }
}
