import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, DropdownModule, FormCheckComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, PopoverModule, BadgeComponent, ButtonCloseDirective, ModalToggleDirective, RowDirective, TooltipDirective, AlertComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { Etudiant } from '../../../modele/Etudiant';
import { PageItemDirective, PageLinkDirective, PaginationComponent } from '@coreui/angular';
import { ModalModule } from '@coreui/angular';
import {SaisieComponent} from './../saisie/saisie.component'
import {UpdateComponent} from './../update/update.component'
import Swal from 'sweetalert2';
import { LoaderService } from '../../../services/loader.service';
import { ManifestationService } from '../../../services/manifestation.service';
import { Manifestation } from '../../../modele/Manifestation';
import { Fonctions } from '../../../util/fonctions';
import { MessageComponent } from '../message/message.component';
import { Message } from '../../../modele/message';

@Component({
  selector: 'app-liste',
  standalone: true,
  
  imports: [
    MessageComponent,
    SaisieComponent,
    UpdateComponent,
    RowComponent, 
    ColComponent, 
    TextColorDirective, 
    CardComponent, 
    CardBodyComponent, 
    TableDirective, 
    TableColorDirective, 
    DropdownModule,
    CommonModule,
    IconDirective,
    FormCheckComponent,
    FormsModule,
    ReactiveFormsModule,  
    FormControlDirective, 
    ButtonDirective, 
    PageItemDirective, 
    PageLinkDirective, 
    PaginationComponent,
    PopoverModule,BadgeComponent,ModalModule,
    ModalToggleDirective,
    ButtonCloseDirective,
    TooltipDirective,
    AlertComponent
  ],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.scss'
})
export class ListeComponent {
  
  filtres=[
    {
      "label":"Tout",
      "value":""
    },
    {
      "label":"Inscrit",
      "value":"Inscrit"
    },
    {
      "label":"Non-inscrit",
      "value":"Non-inscrit"
    }
  ]
  filtre:string="";
  recherche:string='';
  dateRecherche: Date | undefined = undefined;
  status:string='';
  first:number=1;
  rows:number=10;
  totalRecords:number=1;
  pageNumber:number|undefined=0;
  listeManifestation: Manifestation[] = [];
  page=1;
  showSaisie:boolean=false;
  showUpdate:boolean=false;
  show:boolean=false
  manifestation: Manifestation | undefined = new Manifestation();
  selectedIdEtudiant : any[] = [];
  isAnyProductSelected: boolean = false;
  selectedItemsManifestation: Manifestation[] = [];
  message:Message|undefined;
  isCheckedAll=false;
  
  constructor(
    private router:Router,
    private loader:LoaderService,
    private manifestationservice: ManifestationService
  ){
      this.getData();
  } 

  toggleLiveUpdate(manifestation: Manifestation) {
    this.manifestation = manifestation;
    this.showUpdate = !this.showUpdate;
  }

  openMessage(){
    this.show=!this.show;
  }

  handleLiveDemoUpdate(event: any) {
    this.showUpdate = false;
  }

  toggleLiveDemo() {
    this.showSaisie = !this.showSaisie;
  }

  handleLiveDemoChange($event: any) {
    this.showSaisie = $event;
    this.getData();
  }

  handleLiveUpdateChange($event: any) {
    
    this.showUpdate = $event;  // This will now correctly update when the modal closes
    this.getData();
  }
  setMessage($event: any){
    this.message=$event
  }

  public getData(){
    let filtre={
      page : this.page,
      size : this.rows,
      motCle : this.recherche,
      statutConcours : this.status
    }
    this.loader.show();
    this.manifestationservice.getListeManifestation(filtre).subscribe(
      data=> {
        this.loader.hide();
        if(data) {
          this.listeManifestation = data.content;
          this.rows=data.size!;
          this.totalRecords=data.totalElements!;
          this.pageNumber=data.totalPages;
          this.selectedItemsManifestation = [];
          this.isCheckedAll=false;
          this.listeManifestation = data.content.map(item => ({
            ...item,
            isSelected: false // Add the isSelected property
          }));
        }
      },  
      error=>{
        this.loader.hide();
      }
    )
  }

  public sendEmail(idEtudiant:number){
    this.loader.show()
    this.manifestationservice
    .sendEmail(idEtudiant).subscribe(
      data=> {
        this.loader.hide();
        Swal.fire({
          title: 'Succès',
          text: "Le mail a bien ete envoyer ",
          icon: 'success',
        });
      }, 
      error=>{
        this.loader.hide();
        Swal.fire({
          title: 'Erreur',
          text: "Impossible d'envoyer l'email",
          icon: 'error',
        });
      } 
    )
  }

  isInscrit(status:string){
    return status==='Inscrit';
  }
  
  chercher(){
    this.getData();
  }

  chercherPage(page:number){
    this.page=page;
    this.getData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  next(){
    if(this.page<this.pageNumber!){    
      this.page++;
      this.getData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previous(){
    if(this.page>0){    
      this.page--;
      this.getData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onCheckboxChange(item: Manifestation) {
    if (item.isSelected) {
      this.selectedItemsManifestation.push(item);
      
    } else {
      this.selectedItemsManifestation = this.selectedItemsManifestation.filter(i => i !== item);
    }
  }
  
  selectAll() {
    let index = 0;
    this.selectedItemsManifestation = [];
    for( var item of this.listeManifestation){
      this.listeManifestation[index].isSelected=this.isCheckedAll
      if (this.isCheckedAll ) {
        this.selectedItemsManifestation.push(item);
      }
      index++;
    }
  }


  sendEmails() {
    this.loader.show()
    this.manifestationservice.sendEmailsToMultipleStudents(this.selectedItemsManifestation).subscribe({
      next: (response) => {
        this.loader.hide()

      },
      error: (error) => {
        if (error.status === 200) {
        Swal.fire({
          title: 'Succès',
          text: `${this.selectedItemsManifestation.length} email(s) envoyé(s) avec succès.`,
          icon: 'success'
        }).then((result) => {
          this.isCheckedAll=false;
          this.selectAll();
        });
        } else {
          Swal.fire({
            title: 'Erreur',
            text: `'Une erreur est survenue lors de l\'envoi des emails.'`,
            icon: 'error'
          });
        }
      }
    });
  }

  formatedDate(date: Date, isDateNaissance: boolean): string {
    return Fonctions.formatedDate(date, isDateNaissance);
  }

  formatedDate2(date: Date): string {
    return Fonctions.formatedDateFormat(date);
  }

  formatedNomNiveau(nomNiveau: string): string {
    return nomNiveau.split(' - ')[0];
  }

  getFicheManifestation(manifestation: Manifestation) {
    this.manifestation = manifestation;
    let nomNiveau = this.formatedNomNiveau(manifestation!.nomNiveau!);
    this.manifestation.nomNiveau = nomNiveau;
  }

  countNonInscrit(): number {
    return this.listeManifestation.filter(liste => liste.statutConcours === 'Non-inscrit').length;
  }
}
