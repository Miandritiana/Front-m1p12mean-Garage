import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteConcoursService } from '../../../services/note-concours.service';
import {DetailNoteConcours} from '../../../modele/DetailNoteConcours';
import {CardBodyComponent, CardComponent, ColComponent,  RowComponent, TableColorDirective, TableDirective, 
  TextColorDirective, FormControlDirective, ButtonDirective, AvatarComponent,
  CardFooterComponent, ModalModule,
  BadgeComponent, } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderService } from '../../../services/loader.service';
import Swal from 'sweetalert2';
import { IconDirective } from '@coreui/icons-angular';
import { NoteData } from '../../../modele/NoteData';
import { ObservationNoteConcours } from '../../../modele/ObservationNoteConcours';

@Component({
  selector: 'app-note-entretien-saisie',
  standalone: true,
  imports: [
    RowComponent, 
    ColComponent, 
    TextColorDirective, 
    CardComponent, 
    CardBodyComponent, 
    TableDirective, 
    TableColorDirective, 
    CommonModule,
    ReactiveFormsModule, 
    FormsModule, 
    FormControlDirective, 
    ButtonDirective,
    CardFooterComponent,
    IconDirective,
    BadgeComponent,
    ModalModule,
    AvatarComponent
  ],
  templateUrl: './note-entretien-saisie.component.html',
  styleUrl: './note-entretien-saisie.component.scss'
})
export class NoteEntretienSaisieComponent {
  idConcours:number=0;
  dataNote:NoteData|undefined;
  showModal:boolean=false;
  public totalNote: number = 0;
  public totalNoteMax: number = 0;
  public moyenne: number = 0;
  countEpreuve: number = 0;
  isNoter: boolean = true;

  constructor(private noteConcoursService:NoteConcoursService,private router:Router, 
    private activatedRoute: ActivatedRoute,
    private loader:LoaderService
  ){
    this.idConcours =parseInt( this.activatedRoute.snapshot.paramMap.get('id')!);
    this.getData();
  
  }
  
  public getData(){
    this.loader.show();
    this.noteConcoursService.getDataSaisie(this.idConcours).subscribe(
      data=> {
        this.loader.hide();
        this.dataNote = {
          ...data,
          detailNote: data.detailNote.map(item => ({
            ...item,
            observation: item.observation ?? new ObservationNoteConcours()
          }))
        };
      },
      error=>{
        this.loader.hide();
        Swal.fire({
          title: 'Erreur',
          text: error.error.erreurs[0].messageErreur,
          icon: 'error',
        });
      }
    )
  }

  public save(){
    this.isNoter = true;
    this.showModal = true;
    var detailNoteConcours:DetailNoteConcours[]=[];
    var observation: ObservationNoteConcours[] = [];

    this.countEpreuve = this.dataNote?.detailNote?.length ?? 0;

    this.totalNoteMax=20;
    this.totalNote=0;

    for(let item of this.dataNote!.detailNote ){
      detailNoteConcours.push(...item?.detail);
      var note=0;
      
      for (let detail of item.detail) {
        note += detail.note;
      }
      
      if (note <= 0) {
        this.isNoter = false;
        break; // If at least one note exists, mark as true
      }

      this.totalNote+=note; 
    }
    console.log(this.isNoter);
    

    for (let i = 0; i < this.dataNote!.detailNote.length; i++) {
      observation.push({
        observation: this.dataNote!.detailNote[i].observation!.observation,
        idEpreuve: this.dataNote!.detailNote[i].idEpreuve,
      });
    }

    var data={
      // noteConcours:this.noteConcours,
      detailNote:detailNoteConcours,
      idConcours:this.idConcours,
      observation: observation
    }


    this.moyenne = this.totalNote / this.countEpreuve;

    this.showModal = true;

    this.loader.show();
    this.noteConcoursService.insert(data).subscribe(
      data=> {
        this.loader.hide();
      },  
      error => {
        this.loader.hide();
        this.showModal = false;
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.error.erreurs[0].messageErreur,
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
    )
  }

  

  public saveAndValider(){
    var detailNoteConcours:DetailNoteConcours[]=[];
    for(let item of this.dataNote!.detailNote ){
      detailNoteConcours.push(...item?.detail);
    }

    var data={
      detailNote:detailNoteConcours,
      idConcours:this.idConcours,

    }
    this.loader.show();
    this.noteConcoursService.insertValider(data).subscribe(
      data=> {
        this.loader.hide();
        if(this.dataNote){
          this.dataNote.noteConcours=data.noteConcours;
        }
      },  
      error => {
        this.loader.hide();
        alert(error.error.erreurs[0].messageErreur)
      }
    )
  }

  openFichier(dossier:string, event: Event) {
    event.stopPropagation();
      window.open('http://localhost:8090/pdf/'+dossier ,
        dossier, // Nom de la fenêtre
          'width=600,height=800,left=200,top=100'
      )
  }

  public valider(){
      Swal.fire({
        title: 'Confirmation',
        text: 'Voulez-vous vraiment valider la note',
        icon: 'warning',
        confirmButtonText: 'Oui, valider'
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.loader.show();
            this.noteConcoursService.valider(this.dataNote?.noteConcours?.idNoteConcours!).subscribe(
              data=> {
                this.loader.hide();
                this.showModal = false;
                if(data && this.dataNote) {
                  this.dataNote.noteConcours=data;
                }
              },
              error =>{
                this.loader.hide();
                Swal.fire({
                  title: 'Erreur',
                  text: error.error.erreurs[0].messageErreur,
                  icon: 'error',
                });
              }  
            )  
        }
  
      });
    }

    isValide():boolean{
      if(this.dataNote?.noteConcours?.etat==11){
        return true;
      }
      return false;
    }

    toggleLiveDemo() {
      this.showModal = !this.showModal;
      this.showModal = false;
    }
}
