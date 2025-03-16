import { CommonModule } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, ColComponent, DropdownModule, FormControlDirective, FormSelectDirective, ModalModule, PageItemDirective, PageLinkDirective, PaginationComponent, PopoverModule, RowComponent, TableColorDirective, TableDirective, TextColorDirective } from '@coreui/angular';
import { ConcoursService } from '../../../services/concours.service';
import { ModalInscriptionDefinitiveComponent } from './../modal-inscription-definitive/modal-inscription-definitive.component';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-resultat-liste-admis',
  standalone: true,
  imports: [
    ModalInscriptionDefinitiveComponent,
    RowComponent, 
    ColComponent, 
    TextColorDirective, 
    CardComponent, 
    CardBodyComponent, 
    TableDirective, 
    TableColorDirective, 
    DropdownModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
    PageItemDirective, 
    PageLinkDirective, 
    PaginationComponent,
    PopoverModule,
    ModalModule,
    FormsModule,
    FormControlDirective,
    FormSelectDirective,
    BadgeComponent,
    ButtonDirective,
    ButtonModule
  ],
  templateUrl: './resultat-liste-admis.component.html',
  styleUrl: './resultat-liste-admis.component.scss'
})
export class ResultatListeAdmisComponent {
  etudiants: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  page:number = 0;
  pageActuelle: number = 0;
  nombrePage: number[] = [];
  parametre: string | null = "";
  total: number = 0;
  pagenombre: number = 0;
  messageNoContent : string | null = "";
  size: number = 10;
  etat: string | null = null;
  nomPrenomEnseignant: string | null = null;
  filiere: string | null = null;
  niveau : string | null = null;
  disableprevious: boolean = false;
  disablenext: boolean = false;
  listeFiliere: any[] = [];
  listeNiveau: any[] = [];
  searchValue: string = ''; 
  showModalInscriDef:boolean=false;
  isDropdownOpen = false;
  isEtatDropdownOpen = false;
  selectedEtat: any;
  tempSelectedEtat: any = null;

  constructor(private concoursService: ConcoursService, private router: Router) {}

  ngOnInit(): void {
    this.getListeAdmis(this.size, this.page, this.etat, this.nomPrenomEnseignant, this.filiere, this.niveau);
    this.loadListeFiliere();
    this.loadListeNiveau();
  }

  chercher() : void {
    this.getListeAdmis(this.size, this.page, this.etat, this.searchValue, this.filiere, this.niveau);
  }

  chercherFiliere(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const filiere = selectElement.value;
  
    if (filiere === '') {
      this.filiere = null;
    } else {
      this.filiere = filiere;
    }
  
    this.getListeAdmis(this.size, this.page, this.etat, this.searchValue, this.filiere, this.niveau);
  }
  
  chercherNiveau(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const niveau = selectElement.value;
  
    if (niveau === '') {
      this.niveau = null;
    } else {
      this.niveau = niveau;
    }
  
    this.getListeAdmis(this.size, this.page, this.etat, this.searchValue, this.filiere, this.niveau);
  }
  

  getListeAdmis(page: number, size: number, etat: string | null, nomPrenomEnseignant: string | null, filiere: string | null, niveau : string | null): void {
    this.nombrePage = [];
    this.parametre = "";
    if (etat != null) {
      this.parametre += `&etat=${encodeURIComponent(etat)}`;
    }
    if (nomPrenomEnseignant != null) {
      this.parametre += `&nomPrenomEnseignant=${encodeURIComponent(nomPrenomEnseignant)}`;
    }
    if (filiere != null) {
      this.parametre += `&filiere=${encodeURIComponent(filiere)}`;
    }
    if (niveau != null) {
      this.parametre += `&niveau=${encodeURIComponent(niveau)}`;
    }   
    this.concoursService.getListeAdmis(size, page, this.parametre).subscribe(
      data => {
        console.log('Réponse complète:', data); 
        if (data.status === HttpStatusCode.Ok && data.body) {
          this.etudiants = data.body.content;
          console.log(this.etudiants);
          this.total = data.body.totalElements;
          this.pagenombre = data.body.totalPages;
          for (var i = 1; i <= data.body.totalPages; i++) {
            this.nombrePage.push(i);
          }
        } else if (data.status === HttpStatusCode.NoContent) {
          this.messageNoContent = 'Aucun elève admis';
        }
      },
      error => {
        console.error('Erreur lors de l\'appel API:', error);
      }
    );
  }
  

  onPageChange(page: number) {
    this.page = page;
    this.pageActuelle = this.page;
    this.getListeAdmis(this.size, this.page, this.etat, this.nomPrenomEnseignant, this.filiere, this.niveau);
    if(this.page === 0) {
      this.disableprevious = true;
      this.disablenext = false;
    }
    else if(this.page === this.pagenombre-1) {
      this.disableprevious = false;
      this.disablenext = true;
    }
    else {
      this.disableprevious = false;
      this.disablenext = false;
    }
  }

  onPreviousChange() {
    this.page = this.page-1;
    this.pageActuelle = this.page;
    this.getListeAdmis(this.size, this.page, this.etat, this.nomPrenomEnseignant, this.filiere, this.niveau);
    if(this.page === 0) {
      this.disableprevious = true;
      this.disablenext = false;
    }
    else if(this.page === this.pagenombre-1) {
      this.disableprevious = false;
      this.disablenext = true;
    }
    else {
      this.disableprevious = false;
      this.disablenext = false;
    }
  }

  onNextChange() {
    this.page = this.page+1;
    this.pageActuelle = this.page;
    this.getListeAdmis(this.size, this.page, this.etat, this.nomPrenomEnseignant, this.filiere, this.niveau);
    if(this.page === 0) {
      this.disableprevious = true;
      this.disablenext = false;
    }
    else if(this.page === this.pagenombre-1) {
      this.disableprevious = false;
      this.disablenext = true;
    }
    else {
      this.disableprevious = false;
      this.disablenext = false;
    }
  }

  loadListeNiveau(): void {
    this.concoursService.getListeNiveau().subscribe({
      next: (data) => {
        this.listeNiveau = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des niveaux:', err);
      }
    });
  }

  loadListeFiliere(): void {
    this.concoursService.getListeFiliere().subscribe({
      next: (data) => {
        this.listeFiliere = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des filières:', err);
      }
    });
  }

  getStatusSeverity(status: string) {
    switch (status) { 
        case 'inscrit':
            return 'success'; 
        case 'non-inscrit':
            return 'danger'; 
        default:
            return 'secondary';
    }
  }

  goToInscriptionDefinitive(idConcours: number) {
    this.router.navigate(['/resultat/inscription-definitive', idConcours]);
  }

  handleLiveDemoChangeModalInscriDef($event: any) {
    this.showModalInscriDef = $event;
    // this.getData();
  }



  applyFilters(event: Event) {
    this.isDropdownOpen = false;
    this.chercherFiliere(event);
    this.chercherNiveau(event);
    console.log(this.etudiants);
  }
  
}
