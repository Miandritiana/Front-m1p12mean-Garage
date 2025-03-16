import { Component, OnInit } from '@angular/core';
import { 
  BadgeComponent,
  ButtonDirective,
  ButtonModule,
  FormControlDirective,
  PaginationComponent,
  PaginationModule,
  TableColorDirective, 
  TableDirective, 
  TooltipDirective
} from '@coreui/angular';
import { ConcoursService } from '../../../services/concours.service';
import { Fonctions } from '../../../util/fonctions';
import { LoaderService } from '../../../services/loader.service';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-liste-inscription',
  standalone: true,
  imports: [
    TableDirective,
    TableColorDirective,
    NgFor,
    NgIf,
    PaginationComponent,
    PaginationModule,
    IconDirective,
    NgClass,
    NgStyle,
    ButtonModule,
    ButtonDirective,
    TooltipDirective,
    BadgeComponent,
    FormsModule,  
    FormControlDirective
  ],
  templateUrl: './liste-inscription.component.html',
  styleUrl: './liste-inscription.component.scss'
})
export class ListeInscriptionComponent implements OnInit {

  recherche: string='';
  dataSource1: any;
  page = 1;
  etat = "";
  first: number = 1;
  rows: number = 25;
  dateRange: Date[] = [];
  idCampus: number = 0;
  pageNumber: number|undefined = 1;
  totalRecords: number = 1;
  idTiers: number | undefined = undefined;
  idTypeTiers: number | undefined = undefined;

  constructor(private concoursService: ConcoursService,
    private loader:LoaderService,
    private localStorageService : LocalStorageService,
    private router: Router
  ) {
    this.idTiers = this.localStorageService.getIdUtilisateur();
    this.idTypeTiers = this.localStorageService.getIdUtilisateur();
  }

  ngOnInit(): void {
    this.getData();
  }

  chercher(){
    this.getData();
  }

  public getData(){
    let filtre={
      page:this.page,
      etat:this.etat,
      size:this.rows,
      search:this.recherche,
      dateMin:this.dateRange.length!=0?this.formatDate(this.dateRange[0]):'',
      dateMax:this.dateRange.length!=0?this.formatDate(this.dateRange[1]):'',
      idCampus : this.idCampus
    }
    this.loader.show();
    this.concoursService.getAllNouveau(filtre).subscribe(
      data=> {
        this.loader.hide();
        if(data) {
          this.dataSource1 = data.content;
          this.rows=data.size!;
          this.totalRecords=data.totalElements!;
          this.pageNumber=data.totalPages;
        }
      },
      error =>{
        this.loader.hide();
      }  
    )
  }

  validerRecouvrement(idConcours: number) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment valider cette inscription ?',
      icon: 'warning',
      showCancelButton: true, // Affiche le bouton "Annuler"
      cancelButtonText: 'Annuler', // Texte du bouton de refus
      confirmButtonText: 'Oui, valider'
    }).then((result) => {
      if (result.isConfirmed) {
        // Ajouter ici la logique pour valider l'inscription
        this.loader.show();
        this.concoursService.validerRecouvrement(idConcours, this.idTiers!, this.idTypeTiers!).subscribe(
          data=> {
            this.loader.hide();
            if(data) {
              const concours = this.dataSource1.find((c: any) => c.idConcours === idConcours);
              if (concours) {
                concours.etat = 11;
              }
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
      // else if (result.dismiss === Swal.DismissReason.cancel) {
      //   // Si l'utilisateur annule
      //   this.verticallyCenteredModal.visible = false;
      //   console.log("Action annulée !");
      // }
    });
  }

  voirFiche(idConcours: number) {
    this.router.navigate([`/concours/fiche/${idConcours}`]);
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

  formatDate(date: Date): string {
    return Fonctions.formatedDate(date, false).split('à')[0];
  }

  getStatutModePaiement(modePaiement: number): string {
    if(modePaiement==0) {
      return 'En ligne'
    }
    else if(modePaiement==1) {
      return 'Versement'
    }
    return 'En attente de paiement';
  }

  formatedDate(date: Date): string {
    return Fonctions.formatedDateFormat(date);
  }

  getColorIconStatutConcours(etat: number): string {
    if(etat<1){
      return 'danger'
    }
    else if (etat==1){
      return 'warning'
    }
    else if (etat>=11){
      return 'success'
    }
    else{
      return 'light'
    }
  }

  getStatutConcours(etat: number): string {
    if(etat<1){
      return 'Annuler'
    }
    else if (etat==1){
      return 'En attente'
    }
    else if (etat>=11){
      return 'Valider'
    }
    else{
      return 'light'
    }
  }
}
