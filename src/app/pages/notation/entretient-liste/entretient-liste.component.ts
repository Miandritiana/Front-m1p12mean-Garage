import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, ColComponent, DropdownModule, FormCheckComponent, ModalModule, PageItemDirective, PageLinkDirective, PaginationComponent, PopoverModule, RowComponent, TableColorDirective, TableDirective, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CalendarModule } from 'primeng/calendar';
import { Concours } from '../../../modele/Concours';
import { ConcoursService } from '../../../services/concours.service';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-entretient-liste',
  standalone: true,
  imports: [ 
    RowComponent,
    ColComponent, 
    TextColorDirective, 
    CardComponent, 
    CardBodyComponent,
    TableColorDirective,
    TableDirective, 
    TableColorDirective, 
    CommonModule,
    PageLinkDirective, 
    PaginationComponent,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule, 
    PageItemDirective,
    PageLinkDirective, 
    PaginationComponent,
    PopoverModule,
    ModalModule,
    DropdownModule,
    CalendarModule,IconDirective
  ],
  templateUrl: './entretient-liste.component.html',
  styleUrl: './entretient-liste.component.scss'
})
export class EntretientListeComponent {
  first:number=1;
  rows:number=25;
  totalRecords:number=1;
  dataSource :Concours[]= [];
  page=1;
  etat="";
  pageNumber=1;
  dateRange:Date[]=[];
  
constructor(private concoursService:ConcoursService,private router:Router, 
  private loader:LoaderService
){
this.getData();

}

chercher(){
  this.getData();
  }

public getData(){
  this.loader.show();
  let filtre={
    page:this.page,
    etat:this.etat,
    size:this.rows,
    dateMin:this.dateRange&&this.dateRange.length!=0?this.formatDate(this.dateRange[0]):'',
    dateMax:this.dateRange&&this.dateRange.length!=0?this.formatDate(this.dateRange[1]):''
  }
this.concoursService.getEntretienAvenir(filtre).subscribe(
  data=> {
    this.loader.hide();
    if(data) {
      this.dataSource = data.content;
      this.rows=data.size!;
      this.totalRecords=data.totalElements!;
    }
  },
  error =>{
    this.loader.hide();
  }  
)
}

filtres=[
  {
    "label":"Tout",
    "value":""

  },
  {
    "label":"Cloturer",
    "value":"true"

  },
  {
    "label":"Ouvert",
    "value":"false"
  }
] 

onPageChange(event:any){
this.first = event.first;
this.rows = event.rows;
this.page = (this.first / this.rows) + 1;
this.getData();
} 

  rediriger(idConcours:number){
    this.router.navigate([`/note/${idConcours}`]);
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
    if(date==null) return '';
    const day = String(date.getDate()).padStart(2, '0'); // Récupérer le jour et ajouter un zéro devant si nécessaire
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0, donc ajouter 1
    const year = date.getFullYear(); // Récupérer l'année
  
    return `${year}-${month}-${day}`; // Retourner le format 'dd-MM-yyyy'
  }

  redirigerFiche(index:number){
    this.router.navigate(['/concours/programme/fiche'], { queryParams: { idCalendrier: index } });
  }
}
