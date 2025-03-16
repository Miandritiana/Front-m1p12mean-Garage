import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, TableDirective, TableColorDirective,DropdownModule, PopoverModule, PageItemDirective, PageLinkDirective, PaginationComponent, ModalModule, BadgeComponent, FormCheckComponent, ButtonDirective, FormControlDirective } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { IconDirective } from '@coreui/icons-angular';
import { LoaderService } from '../../../services/loader.service';
import { ProgrammeService } from '../../../services/programme.service';
import { ProgrammeConcours } from '../../../modele/programmeConcours';
import { Fonctions } from '../../../util/fonctions';

@Component({
  selector: 'app-programme-entretien',
  standalone: true,
  imports: [
    RowComponent, 
    ColComponent, 
    TextColorDirective, 
    CardComponent, 
    CardBodyComponent, 
    TableColorDirective,
    DropdownModule,
    CommonModule,
    FormCheckComponent,
    FormsModule,
    ReactiveFormsModule, 
    ButtonDirective, 
    PageItemDirective, PageLinkDirective, PaginationComponent,
    PopoverModule,BadgeComponent,ModalModule,
    IconDirective,CalendarModule
  ],
  templateUrl: './programme-entretien.component.html',
  styleUrl: './programme-entretien.component.scss'
})
export class ProgrammeEntretienComponent {
  recherche:string='';
  first:number=1;
  rows:number=25;
  totalRecords:number=1;
  dataSource :ProgrammeConcours[]= [];
  page=1;
  pageNumber=1;
  dateRange:Date[]=[new Date()];
  nbrParGroup:number[]=[];
  ngOnInit() {}
  etat:number|undefined
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

    constructor(private programmeService:ProgrammeService,private router:Router, private loader:LoaderService
){
this.getData();
}

public getData(){
this.loader.show();
this.programmeService.getAll().subscribe(
  data=> {
  this.loader.hide();
    if(data) {
      this.dataSource = data;
    }
  },
  error =>{
    this.loader.hide();
  }  
)
}


  formatDate(date: Date): string {
    if(date==null) return '';
    const day = String(date.getDate()).padStart(2, '0'); // Récupérer le jour et ajouter un zéro devant si nécessaire
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0, donc ajouter 1
    const year = date.getFullYear(); // Récupérer l'année
  
    return `${year}-${month}-${day}`; // Retourner le format 'dd-MM-yyyy'
  }

  redirigerFiche(index:number){
    this.router.navigate(['/programme/fiche'], { queryParams: { idCalendrier: index } });
  }

  formatedDate(date: Date): string {
    return Fonctions.formatedDateFormat(date);
  }

}
