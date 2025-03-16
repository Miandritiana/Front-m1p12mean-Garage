import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent, CardBodyComponent, CardComponent, ColComponent, DropdownModule, FormCheckComponent, FormControlDirective, FormSelectDirective, ModalModule, PageItemDirective, PageLinkDirective, PaginationComponent, PopoverModule, RowComponent, TableColorDirective, TableDirective, TextColorDirective } from '@coreui/angular';
import { IconComponent, IconDirective } from '@coreui/icons-angular';
import { TotalNoteConcours } from '../../../modele/TotalNoteConcours';
import { ConcoursService } from '../../../services/concours.service';
import { LoaderService } from '../../../services/loader.service';
import { NoteConcoursService } from '../../../services/note-concours.service';
import Swal from 'sweetalert2';
import { ButtonDirective } from '@coreui/angular';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-resultat-liste',
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
    IconDirective,
    ButtonDirective,
    ButtonModule
  ],
  templateUrl: './resultat-liste.component.html',
  styleUrl: './resultat-liste.component.scss'
})
export class ResultatListeComponent {
  dataSource :TotalNoteConcours[] = [];
  rows:number=10;
  totalRecords:number=1;
  pageNumber:number|undefined=0;
  page=1;
  status:string='';
  boutonDisabled: boolean = true;
  isDropdownDisabled = false;
  recherche:string='';
  filiere: string | null = null;
  niveau : string | null = null;
  listeFiliere: any[] = [];
  listeNiveau: any[] = [];
  listeEtat = [
    { idEtat: 1, badge: 'admis', nom: 'Admis' },
    { idEtat: 2, badge: 'non-admis', nom: 'Non-admis' },
    { idEtat: 3, badge: 'en-attente', nom: 'En attente' }
  ];

  isDropdownOpen = false;
  isEtatDropdownOpen = false;
  selectedEtat: any;
  tempSelectedEtat: any = null;

  constructor(private noteConcoursService: NoteConcoursService,
    private loader:LoaderService, private concourservice: ConcoursService,
    private concoursService: ConcoursService, ) {
    this.getData();
    this.loadListeFiliere();
    this.loadListeNiveau();
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

  public getData() {
    console.log(this.selectedEtat);
    
    let filtre={
      nom:this.recherche, 
      idFiliere:this.filiere,
      idNiveau:this.niveau,
      etat: this.selectedEtat?.badge,
      page:this.page,
      size:this.rows
    }
    console.log("Filtre envoyé :", filtre);

    this.loader.show();
    this.noteConcoursService.getAllResultat(filtre).subscribe(
      data=> {
        this.loader.hide();
        console.log('Réponse des résultats :', data);
        if(data) {
          this.dataSource = data.content;
          this.rows=data.size!;
          this.totalRecords=data.totalElements!;
          this.pageNumber=data.totalPages;
        }
      },  
      error=>{
        this.loader.hide();
      }
    )
  }

  chercherPage(page:number) {
    console.log(page);
    this.page=page;
    this.getData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  next() {
    if(this.page<this.pageNumber!) {    
      this.page++;
      this.getData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previous() {
    if(this.page>0) {    
      this.page--;
      this.getData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  accepterConcours(idConcours: number) {
    this.concourservice.accepterConcours(idConcours).subscribe(
      data=> {
        Swal.fire({
          title: 'Succès',
          text: data.message,
          icon: 'success',
        });

        const resultat = this.dataSource.find(obj => obj.idConcours === idConcours);
        resultat!.etat = 'admis';
      }
    )
  }

  refuserConcours(idConcours: number) {
    this.concourservice.refuserConcours(idConcours).subscribe(
      data=> {
        Swal.fire({
          title: 'Refuser',
          text: data.message,
          icon: 'warning',
        });

        const resultat = this.dataSource.find(obj => obj.idConcours === idConcours);
        resultat!.etat = 'non-admis';
      }
    )
  }

  getStatusSeverity(status: string) {
    switch (status) { 
        case 'admis':
            return 'success'; 
        case 'non-admis':
            return 'danger'; 
        default:
            return 'secondary';
    }
  }



  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleEtatDropdown(event: Event) {
    event.stopPropagation();
    this.isEtatDropdownOpen = !this.isEtatDropdownOpen;
  }

  selectEtat(etat: any) {
    this.selectedEtat = etat;
    this.isDropdownOpen = false;
  }

  setTempEtat(etat: any) {
    this.tempSelectedEtat = etat;
    this.selectedEtat = etat;
  }

  clearEtat(event: Event) {
    event.stopPropagation();
    this.selectedEtat = null;
    this.isEtatDropdownOpen = false;
  }

  applyFilters() {
    this.isDropdownOpen = false;
    this.getData();
  }
  

}
