import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, DropdownModule, FormCheckComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, PopoverModule, BadgeComponent, ButtonCloseDirective, PageItemDirective, PageLinkDirective, PaginationComponent, ModalModule } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { LoaderService } from 'src/app/services/loader.service';
import {Enseignant} from 'src/app/modele/Enseignant';
import {EnseignantService} from 'src/app/services/enseignant.service';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [RowComponent, 
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
    IconDirective,
    FormControlDirective
  ],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.scss'
})
export class ListeComponent {
  
  filtre:string="";
  recherche:string='';
  status:string='';

  first:number=1;
  rows:number=10;
  totalRecords:number=1;
  pageNumber:number|undefined=0;
  dataSource :Enseignant[]= [];
  page=1;
  constructor(private enseignantService:EnseignantService,
    private router:Router,
    private loader:LoaderService
  ){
      this.getData();
  } 

  

  public getData(){
    let filtre={
      page:this.page,
      size:this.rows,
      search:this.recherche,
      status:this.status
    }
    this.loader.show();
    this.enseignantService.getAll(filtre).subscribe(
      data=> {
        this.loader.hide();
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

  redirectDisponible(idEnseignant: number | undefined) {
    this.router.navigate(['/enseignant/disponibilite'], {
      queryParams: {
        idEnseignant: idEnseignant
      }
    });
  }
  
}
