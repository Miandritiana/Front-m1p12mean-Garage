import { Component } from '@angular/core';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, DropdownModule, FormCheckComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, PopoverModule, BadgeComponent, ButtonCloseDirective, InputGroupComponent, InputGroupTextDirective, PopoverDirective, FormSelectDirective, DropdownCloseDirective } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { SeuilNoteService } from '../../services/seuil-note.service';
import { LoaderService } from '../../services/loader.service';
import { SeuilNote } from '../../modele/SeuilNote';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-seuil-note-concours',
  standalone: true,
    imports: [
      RowComponent,
      ColComponent,
      TextColorDirective,
      CardComponent,
      CardBodyComponent,
      TableDirective,
      TableColorDirective,
      DropdownModule,
      ButtonDirective,
      PopoverModule,
      CommonModule,
      IconDirective,
      FormsModule
    ],
  templateUrl: './seuil-note-concours.component.html',
  styleUrl: './seuil-note-concours.component.scss'
})
export class SeuilNoteConcoursComponent {

  seuilnotes: SeuilNote[] = [];
  seuil: SeuilNote[] = [];
  idPat: number | undefined = undefined;

  constructor(private seuilNoteService: SeuilNoteService,
    private loader:LoaderService, private localStorageService : LocalStorageService
  ) {
    this.idPat = this.localStorageService.getIdUtilisateur();
   }

  ngOnInit(): void {
    this.getData();
    // this.seuilnotes = this.seuilNoteService.getSeuilNotes().map(note => ({
    //   ...note,
    //   note: Number(note.note),
    // }));
  }
  
  startEdit(baremenote: SeuilNote) {
    baremenote.showEdit = true;
  }

  endEdit(baremenote: SeuilNote) {
    // if(baremenote.note != baremenote.noteInitial) {
    //   baremenote.showEdit = false;
    // }
    baremenote.showEdit = false;
  }

  saveChanges() {
    this.seuilnotes.forEach((b: SeuilNote) => b.showEdit = false); // Now TypeScript knows 'b' has an 'isEditing' property
  }

  getData(){
    this.loader.show();
    this.seuilNoteService.getAll().subscribe(
      data=> {
      this.loader.hide();
        if(data) {
          this.seuilnotes=data;
          this.seuilnotes = data.map(item => ({
            ...item,
            noteInitial: item.note,
            showEdit: false
          }));
          }
        },
      error =>{
        this.loader.hide();
      }  
    );
  }

  enregistrer() {
    this.seuilnotes.forEach(valeurs => {
      if (valeurs.note != valeurs.noteInitial) { // Vérifie que montant n'est ni null ni undefined
        this.seuil.push({
          idNiveau: valeurs.idNiveau,
          note: valeurs.note,
        });
      }
    });

    this.seuilNoteService.saveSeuilNotes(this.seuil, this.idPat!).subscribe(
      data => {
        if(data) {
          data.forEach(item => {
            const seuil = this.seuilnotes.find(obj => obj.idNiveau === item.idNiveau);
            if (seuil) { // Vérifie que l'élément existe
              seuil!.dateSaisie = item.dateSaisie;
            }
          });
        }
      }
    );
  }

  formatedDate(date: Date): string {
    // Si la date est vide ou non définie, on retourne une chaîne vide
    if (date == null) {
      return '';
    }
    
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return 'Date invalide'; // Si la date n'est pas valide
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',  // Jour de la semaine en texte complet
      year: 'numeric',  // Année en format numérique
      month: 'long',    // Mois en texte complet
      day: 'numeric',   // Jour du mois en numérique
      hour: '2-digit',  // Heure en format 2 chiffres
      minute: '2-digit' // Minute en format 2 chiffres
    };

    return new Intl.DateTimeFormat('fr-FR', options).format(parsedDate);
  }

}
