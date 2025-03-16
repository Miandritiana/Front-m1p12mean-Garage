import { Component } from '@angular/core';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, TableDirective, TableColorDirective, DropdownModule, PopoverModule} from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SaisieComponent } from '../saisie/saisie.component';
import { TemplateMailService } from '../../../services/template-mail.service';
import { TemplateMail } from '../../../modele/templateMail';
import { DomSanitizer } from '@angular/platform-browser';
import { TruncateHtmlPipe } from '../../calendrier/liste/truncate-html.pipe';
import { ButtonCloseDirective, ButtonDirective, FormDirective, FormLabelDirective, ModalModule,FormControlDirective,InputGroupComponent, InputGroupTextDirective,  } from '@coreui/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-corpsmail',
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
      PopoverModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      SaisieComponent,
      TruncateHtmlPipe,
      ButtonDirective,
      RouterModule
    ],
  templateUrl: './corpsmail.component.html',
  styleUrl: './corpsmail.component.scss'
})
export class CorpsmailComponent {

  corpsmails = [
    { sujet: 'Inscrit au concours', contenue: 'Vous avez inscrit au concours. Cordialement' },
    { sujet: 'Rappel inscription définitive', contenue: 'On vous rappelle pour l\'inscription definitive parcque vous avez eu une note suffisante' },
  ];

  page=1;
  rows:number=25;
  showSaisie = false;
  sujet: string = '';
  selectedCorpsMail: any;
  dataSource :TemplateMail[]= [];
  totalRecords:number=1;
  pageNumber:number|undefined=0;
  corpsmail:TemplateMail|undefined;
  indexSelected=0;
  idPat: number |undefined;
  constructor(private templateEmailService:TemplateMailService, private router: Router,
    private localStorageService : LocalStorageService
  ) {
    this.getAllData();
    this.idPat = this.localStorageService.getIdUtilisateur();
  }



  // Method to open modal and pass data
  modifCorpMail(i:number) {
    this.indexSelected=i;
    var corpsmail= this.dataSource[this.indexSelected];
    this.selectedCorpsMail = { ...corpsmail };
    this.showSaisie = false;
    setTimeout(() => {
      this.showSaisie = true;
    });
  }

  // Handle updated content from child component
  updateCorpsMail(updatedData: TemplateMail) {
    
    if (updatedData) {
      this.selectedCorpsMail = updatedData; 
      this.dataSource[this.indexSelected].objet=this.selectedCorpsMail.objet;
      this.dataSource[this.indexSelected].corps=this.selectedCorpsMail.corps;
    }
    this.showSaisie = false;
    this.selectedCorpsMail = null;
  }

  getAllData(){
    let filtre={
      page:this.page,
      size:this.rows
    }
    this.templateEmailService.getAll(filtre).subscribe(
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

  voirHistorique(idTemplateMail: number, description: string, event: Event): void {
    event.stopPropagation();  // Prevents triggering other click events like modifCorpMail
  
    console.log('Navigating with:', { idTemplateMail, description });  // Check if data is correctly passed
  
    // Navigate to the child component with queryParams
    this.router.navigate(['corpsmail/historique'], {
      queryParams: { idTemplateMail, description }
    });
  } 
  

}  
