import { CommonModule } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardBodyComponent, CardComponent, ColComponent, DropdownModule, ModalModule, PageItemDirective, PageLinkDirective, PaginationComponent, PopoverModule, RowComponent, TableColorDirective, TableDirective, TextColorDirective } from '@coreui/angular';
import { CalendarModule } from 'primeng/calendar';
import { InscriptionService } from '../../../services/inscription.service';

@Component({
  selector: 'app-inscription-definitive-liste',
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
        CalendarModule,
  ],
  templateUrl: './inscription-definitive-liste.component.html',
  styleUrl: './inscription-definitive-liste.component.scss'
})
export class InscriptionDefinitiveListeComponent {
  listeEtudiant : any [] = [];
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
  nomPrenom: string | null = null;
  disableprevious: boolean = false;
  disablenext: boolean = false;
  searchValue: string = ''; 
  dateStart : string | null = null;
  dateEnd : string | null = null;
  dateRange: Date[] = [];

  constructor(
    private inscriptionservice: InscriptionService
  ) {}

  ngOnInit(): void {
    this.getListeEtudiant(this.size, this.page, this.nomPrenom, this.dateStart, this.dateEnd);
    
  }



  getListeEtudiant(page: number, size: number, nomPrenom: string | null, dateStart : string | null, dateEnd : string | null ): void {
      this.nombrePage = [];
      this.parametre = "";
      if (nomPrenom != null) {
        this.parametre += `&nomPrenom=${encodeURIComponent(nomPrenom)}`;
      }
      if (dateStart) {
        this.parametre += `&dateStart=${new Date(dateStart).toISOString()}`;
      }
      if (dateEnd) {
        this.parametre += `&dateEnd=${new Date(dateEnd).toISOString()}`;
      }  
      this.inscriptionservice.getListeEtudiantInscrit(size, page, this.parametre).subscribe(
        data => {
          console.log('Réponse complète:', data); 
          if (data.status === HttpStatusCode.Ok && data.body) {
            this.listeEtudiant = data.body.content;
            console.log(this.listeEtudiant);
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
    this.getListeEtudiant(this.size, this.page, this.nomPrenom, this.dateStart, this.dateEnd);
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
    this.getListeEtudiant(this.size, this.page, this.nomPrenom, this.dateStart, this.dateEnd);
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
    this.getListeEtudiant(this.size, this.page, this.nomPrenom, this.dateStart, this.dateEnd);
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

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0'); // Récupérer le jour et ajouter un zéro devant si nécessaire
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0, donc ajouter 1
    const year = date.getFullYear(); // Récupérer l'année

    return `${year}-${month}-${day}`; 
  }



  filterListeEtudiant(): void {
    if (this.dateRange && this.dateRange.length > 0) {
      const date1 = this.dateRange[0]; 
      const date2 = this.dateRange.length > 1 ? this.dateRange[1] : null; 
  
      if (date1) { 
        const formattedDate1 = this.formatDate(date1);
        const formattedDate2 = date2 ? this.formatDate(date2) : null; 
        this.getListeEtudiant(this.size,this.page,this.nomPrenom, formattedDate1, formattedDate2);
      } else {
        console.error('Date1 est invalide.');
      }
    }
  }
  

  
}
