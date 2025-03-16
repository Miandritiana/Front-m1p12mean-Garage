import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../util/constants';
import { SeuilNote } from '../modele/SeuilNote';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeuilNoteService {
  url:string=  Constants.BASE_URL_2 + '/api/seuil/note/concours';
  seuilnotes: { niveau: string; note: string; showEdit: boolean; isEditing: boolean, nomNiveau: string }[] = [
    { niveau: 'L1', note: '13', showEdit: false, isEditing: false, nomNiveau: 'Licence 1' },
    { niveau: 'L2', note: '12', showEdit: false, isEditing: false, nomNiveau: 'Licence 2' },
    { niveau: 'L3', note: '10', showEdit: false, isEditing: false, nomNiveau: 'Licence 3' },
    { niveau: 'M1', note: '10', showEdit: false, isEditing: false, nomNiveau: 'Master 1' },
    { niveau: 'M2', note: '15', showEdit: false, isEditing: false, nomNiveau: 'Master 2' },
  ];

  constructor(private http: HttpClient) { }

  getSeuilNotes() {
    return this.seuilnotes;
  }

  getAll(): Observable<SeuilNote[]> {
      const url = `${this.url}`;
      return this.http.get<SeuilNote[]>(url);
  }

  saveSeuilNotes(seuilNotes: any[], idPat: number): Observable<SeuilNote[]> {
    const url = `${this.url}/multiple?idPat=${idPat}`;
    return this.http.post<SeuilNote[]>(url, seuilNotes);
  }

}
