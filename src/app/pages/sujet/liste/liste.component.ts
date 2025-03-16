import { CommonModule, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, DropdownModule, FormCheckComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, PopoverModule, BadgeComponent, ButtonCloseDirective, InputGroupComponent, InputGroupTextDirective, PopoverDirective, FormSelectDirective, DropdownCloseDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { DocsExampleComponent } from '@docs-components/public-api';
import { PageItemDirective, PageLinkDirective, PaginationComponent } from '@coreui/angular';
import { ModalModule } from '@coreui/angular';
import { LoaderService } from 'src/app/services/loader.service';
import { SujetService } from 'src/app/services/sujet.service';
import { Sujet } from 'src/app/modele/Sujet';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TruncateHtmlPipe } from './truncate-html.pipe'; // Assurez-vous que le chemin est correct
import { Niveau } from 'src/app/modele/Niveau';
import { NiveauService } from 'src/app/services/niveau.service';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-liste',
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
    IconDirective,
    FormsModule,
    ReactiveFormsModule, 
    FormLabelDirective, 
    FormControlDirective, 
    ButtonDirective, 
    PageItemDirective, 
    PageLinkDirective, 
    PaginationComponent,
    PopoverModule,
    BadgeComponent,
    ModalModule,
    TruncateHtmlPipe,
    FormLabelDirective, 
    FormControlDirective,
    DropdownModule,
    FormSelectDirective,
    DropdownCloseDirective
  ],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.scss'
})
export class ListeComponent {

  rows:number=10;
  totalRecords:number=1;
  pageNumber:number|undefined=0;
  dataSource :Sujet[]= [];
  page=1;
  showSaisie:boolean=false;
  showUpdate:boolean=false;
  recherche="";
  idNiveau:number|undefined;
  idMois:number|undefined;
  annee:number|undefined;
  appliquerRecherche=false;
  niveau:Niveau[]=[]
  mois: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  
  constructor(private loader:LoaderService,
    private sujetService:SujetService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private niveauService:NiveauService,
  ){
    
    this.getData();
    this.getDataNiveau();
  }

  private getDataNiveau(){
    this.niveauService.getAll().subscribe(
      data=> {
        if(data) {
          this.niveau = data;
        }
      },  
    )
  }
  
  public getData(){
    let filtre={
      page:this.page,
      size:this.rows,
      recherche:this.recherche,
      idNiveau : this.idNiveau,
      mois: this.idMois,
      annee : this.annee
    }
    console.log(filtre)
    this.sujetService.getAll(filtre).subscribe(
      data=> {
        if(data) {
          this.dataSource = data.content;
          this.rows=data.size!;
          this.totalRecords=data.totalElements!;
          this.pageNumber=data.totalPages;
        }
      },  
    )
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

  sanitizeHtml(htmlContent: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }


  redirigerFiche(idSujet:number){
    this.router.navigate([`/sujet/fiche/${idSujet}`]);
  }

  closeIdNiveau(){
    this.idNiveau=undefined;
    this.getData();
  }

  closeIMois(){
    this.idMois=undefined;
    this.getData();
  }

  closeAnnee(){
    this.annee=undefined;
    this.getData();
  }
  appliquer(){
    this.appliquerRecherche=true;
    this.getData();
  }

}
