import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, ColComponent, DropdownModule, FormCheckComponent, FormControlDirective, ModalModule, PageItemDirective, PageLinkDirective, PaginationComponent, PopoverModule, RowComponent, TableColorDirective, TableDirective, TextColorDirective, TooltipDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CalendarModule } from 'primeng/calendar';
import { Subscription } from 'rxjs';
import { Concours } from '../../../modele/Concours';
import { ConcoursService } from '../../../services/concours.service';
import { LoaderService } from '../../../services/loader.service';
import Swal from 'sweetalert2';
import { ChipModule  } from 'primeng/chip';
import { LocalStorageService } from '../../../services/local-storage.service';
import { CampusService } from '../../../services/campus.service';
import { Fonctions } from '../../../util/fonctions';

@Component({
  selector: 'app-liste',
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
    FormsModule,
    ReactiveFormsModule, 
    PageItemDirective, PageLinkDirective, PaginationComponent,
    PopoverModule,BadgeComponent,ModalModule,
    IconDirective,CalendarModule,
    ChipModule,
    TooltipDirective,
    ButtonDirective,DropdownModule, FormCheckComponent, FormControlDirective, 
  ],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.scss'
})
export class ListeComponent implements OnInit,OnDestroy {
  private subscriptions = new Subscription();


  recherche:string='';
  date1 :Date|undefined;
  date2 :Date|undefined;
  first:number=1;
  rows:number=25;
  totalRecords:number=1;
  dataSource :Concours[]= [];
  dataSource1 : any;
  page=1;
  etat="";
  pageNumber:number|undefined=1;
  dateRange:Date[]=[];
  checked:{id:number,checked:boolean}[]=[];
  checkedAll=false;
  selectedItems: Concours[] = [] ;
  filtres=[
    {
      "label":"Liste complete",
      "value":""

    },
    {
      "label":"Dossier à traités",
      "value":"1"

    },
    {
      "label":"Dossier à valider",
      "value":"11"
    },
    {
      "label":"Dossier validés",
      "value":"21"
    },
    {
      "label":"Dossier sous reserve",
      "value":"22"
    }
  ];
  idTiers: number |undefined;
  typeTiers : number | undefined;
  idCampus : number = 0;
  listeCampus : any;
  isDropdownOpen = false;

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const etat = params.get('etat');
      this.handleQueryParamChange(etat);
    });

     // Subscribe to URL changes with hash
     this.subscriptions.add(
      this.location.subscribe(() => {
        const etat = this.route.snapshot.queryParamMap.get('etat');
        this.handleQueryParamChange(etat);
      })
    );
    this.getListeCampus();
  }

  
  ngOnDestroy(): void {
    // Désinscrire tous les abonnements
    this.subscriptions.unsubscribe();
  }

  handleQueryParamChange(etat: string | null): void {
    this.etat=etat!
    this.getData();
  }



  constructor(private concoursService:ConcoursService,private router:Router,
    private loader:LoaderService,
    private route: ActivatedRoute,
    private location: Location,
    private localStorageService : LocalStorageService,
    private campusService : CampusService
  ){
    this.idTiers = this.localStorageService.getIdUtilisateur();
    this.typeTiers = 1;
  }

  public getData(){
    this.checkedAll=false;
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
    this.concoursService.getAll(filtre).subscribe(
      data=> {
        this.loader.hide();
        if(data) {
          this.dataSource1 = data.content;
          this.rows=data.size!;
          this.totalRecords=data.totalElements!;
          this.pageNumber=data.totalPages;
          this.checked=[]
          for(let item of this.dataSource ){
            this.checked.push({"id":item.idConcours,"checked":false});
          }
          
        console.log(this.checked);
        console.log("data :", this.dataSource1);
        }
      },
      error =>{
        this.loader.hide();
      }  
    )
  }

  onPageChange(event:any){
    this.first = event.first;
    this.rows = event.rows;
    this.page = (this.first / this.rows) + 1;
    this.getData();
  } 

  chercher(){
    this.getData();
  }

  redirigerSaisie(){
    this.router.navigate([`/etudiant/saisie`]);
  }

  private formatData(concours: Concours[]): any[] {
    return concours.map(concours => {
        const formattedEtudiant = {
        data: concours,
      };


      return formattedEtudiant;
    });
  }


  openFichier(dossier:string, event: Event) {
    event.stopPropagation();
      window.open('http://localhost:8090/pdf/'+dossier ,
        dossier, // Nom de la fenêtre
          'width=600,height=800,left=200,top=100'
      )
  }

  
  supprimerStatus(){
    this.etat= "";
  }

  formatDate(date: Date): string {
    return Fonctions.formatedDate(date, false).split('à')[0];
  }

  redirigerFiche(id:number){
    this.router.navigate([`/concours/fiche/${id}`]);
  }

  getColorStatut(etat:number): string {
    return Fonctions.getColorStatut(etat);
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

  public getLibelleFiltre(value:string){
    if(value==="")return '';
    return this.filtres.find(x => x.value === value)?.label;

  }

  onCheckboxClick(event: Event,i: number) {
    event.stopPropagation();
    this.checked[i].checked=!this.checked[i].checked; 
  }

  checkAll(event: Event){
    event.stopPropagation();
    this.checkedAll=!this.checkedAll;
    for(let i=0;i<this.checked.length;i++){
      if(this.dataSource[i].etat==1){
        this.checked[i].checked=this.checkedAll; 
      }
    }
  }

  validerMultiple(){
    var ids:number[]=[];
    for(let item of this.checked ){
      if(item.checked){
        ids.push(item.id);
      }
    }
    this.concoursService.validerMultiple(ids,this.idTiers, this.typeTiers).subscribe(
      data=> {
        this.loader.hide();      
        this.getData();
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


  countCheck():number{
    let checkedCount:number= this.checked ? this.checked.filter(item => item.checked).length : 0;
    return checkedCount;
  }


  onCheckboxChange(item: Concours) {
    if (item.isSelected) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    }
    console.log(this.selectedItems);
  }

  onEtatChange(event: any) {
    if (!event.value) {
      // Si la sélection est effacée (null), on réinitialise la valeur à une chaîne vide
      this.etat = '';
    }
  }

  findEtatLib(){
    const found = this.filtres.find(item => item.value === this.etat);
    return found?.label;
  }

  getListeCampus() {
    this.loader.show();
    this.campusService.getCampus().subscribe(response => {
      this.listeCampus = response;
    }, error => {
      this.loader.hide();
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  afficherStatutInscription(etat:number){
    var statut =this.getStatutInscription(etat);
    var html=`<c-badge [color]="${statut.color}">${statut.libelle}</c-badge>`
    console.log(html)
    return html;
  }

  public getStatutInscription(etat:number){
    if(etat==0){
      return {
        'color':'danger',
        'libelle':'Annuler'
      }
    }
    else if(etat==1){
      return{
        'color':'warning',
        'libelle':'En attente'
      }
      
    }
    else if(etat<=11){
      return {
        'color':'success',
        'libelle':'Valider'
      }
    }
    else{
      return {
        'color':'primary',
        'libelle':'INCONNU'
      }
    }

  }

  formatedDate(date: Date): string {
    return Fonctions.formatedDateFormat(date);
  }

  formaterheure(heure:string){
    var tab= heure.split(":");
    if(tab.length==3){
      return `${tab[0]}:${tab[1]}`
    }
    else return heure;
    
  }

  getDossierManquantHTML(dossier:string){
    if(dossier){
      return dossier.replaceAll("|","<br>");
    }
    else {
      return "";
    }
  }


  
}
