import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudMecanicienService {

  private url= Constants.BASE_URL;
  

  constructor(private http: HttpClient) { }

  getMecaniciens(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/users/mecanicien');
  }

  addMecanicien(mecanicien: any): Observable<any> {
    return this.http.post<any>(this.url + '/users/ajoutmecanicien', mecanicien);
  }

  modifierMecanicien(idMecanicien: string, mecanicien: any): Observable<any> {
    return this.http.put<any>(this.url + '/users/mecanicien/'+idMecanicien, mecanicien);
  }


  newPassword(idMecanicien: string, oldpassword: string, newpassword: string) {
    const data = {
      oldpassword: oldpassword,
      newpassword: newpassword
    }
    return this.http.post<any>(this.url + '/users/changepassword/'+idMecanicien, data);
  }

}
