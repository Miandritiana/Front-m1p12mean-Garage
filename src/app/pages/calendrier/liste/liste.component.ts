import { Component } from '@angular/core';
import { Calendrier } from '../../../modele/Calendrier';
import { CalendrierService } from '../../../services/calendrier.service';
import { PageItemDirective, PageLinkDirective, PaginationComponent } from '@coreui/angular';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, DropdownModule, FormCheckComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, PopoverModule, BadgeComponent, ButtonCloseDirective, InputGroupComponent, InputGroupTextDirective, PopoverDirective, FormSelectDirective, DropdownCloseDirective } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../services/loader.service';
import { IconDirective } from '@coreui/icons-angular';
import { SaisieComponent } from './../saisie/saisie.component';
import { UpdateComponent } from './../update/update.component';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Fonctions } from '../../../util/fonctions';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [
    SaisieComponent,
    PageItemDirective, PageLinkDirective, PaginationComponent,
    RowComponent,
    ColComponent,
    CardComponent, 
    CardBodyComponent,
    CommonModule,
    TextColorDirective,
    TableDirective, 
    TableColorDirective, 
    DropdownModule, 
    PopoverModule,
    IconDirective,
    ButtonDirective,
    BadgeComponent,
    UpdateComponent
  ],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.scss'
})
export class ListeComponent {

  dataSource :Calendrier[] = [];
  rows:number=10;
  totalRecords:number=1;
  pageNumber:number|undefined=0;
  page:number=1;
  showSaisie:boolean=false;
  showUpdate:boolean=false;
  selectedDateConcours: string | undefined;
  selectedId: string | undefined;
  
  constructor(private calendrierService: CalendrierService,
    private loader:LoaderService, private route: ActivatedRoute)
  {
    this.getData();
  }

  public getData(){    
    let filtre={      
      page:this.page,
      size:this.rows
    }
    this.loader.show();
    this.calendrierService.getAll(filtre).subscribe(
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

  toggleLiveDemoSaisie() {
    this.showSaisie = this.showSaisie=!this.showSaisie;
  }

  handleLiveDemoChangeSaisie($event: any) {
    this.showSaisie = $event;
    this.getData();
  }

  toggleLiveDemoUpdate() {
    this.showUpdate = this.showUpdate=!this.showUpdate;
  }

  handleLiveDemoChangeUpdate($event: any) {
    this.showUpdate = $event;
    // this.getData();
  }

  isCloturer(cloturer: boolean): boolean {
    return cloturer;
  }
  

  lastPage() {
    this.loader.show();
    this.page = this.pageNumber ?? 1;
    this.getData();
  }

  modifyDateConcours(idCalendrier: number, dateConcours:Date){}

  deleteDateConcours(idCalendrier: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous êtes sur le point de supprimer cette date concours.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader.show();
        this.calendrierService.delete(idCalendrier).subscribe({
          next: (response) => {
            this.loader.hide();
            this.getData();
            Swal.fire(
              'Supprimé!',
              'La date concours a été supprimée avec succès.',
              'success'
            );
          },
          error: (error) => {            
            this.loader.hide();
            Swal.fire(
              'Erreur!',
              error.error.erreurs[0].messageErreur,
              'error'
            );
          }
        });
      }
    });
  }

  openUpdateModal(rowData: any) {
    this.showUpdate = false; // Close the modal temporarily
    setTimeout(() => {
      this.selectedDateConcours = rowData.dateConcours; // Set date
      this.selectedId = rowData.idCalendrier; // Set id
      this.showUpdate = true; // Reopen the modal
    }, 0);
  }
  


  formatedDate(date: Date): string {
    return Fonctions.formatedDateFormat(date);
  }

}
