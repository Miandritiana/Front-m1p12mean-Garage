import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, DropdownModule,FormControlDirective, ModalModule,PopoverModule, RowComponent, TableColorDirective, TableDirective, TextColorDirective } from '@coreui/angular';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgrammeService } from '../../../services/programme.service';
import { Calendrier } from '../../../modele/Calendrier';
import { CalendrierDispatch } from '../../../modele/CalendrierDispatch';
import { LoaderService } from '../../../services/loader.service';
import { Fonctions } from '../../../util/fonctions';
import { Enseignant } from '../../../modele/Enseignant';
import { EnseignantService } from '../../../services/enseignant.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SalleService } from '../../../services/salle.service';
import { Salle } from '../../../modele/Salle';
import { ConcoursEnseignantDispatch } from '../../../modele/ConcoursEnseignantDispatch';
import { ConcoursEnseignantDispatchService } from '../../../services/concours-enseignant-dispatch.service';


@Component({
  selector: 'app-programme-fiche',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective, TableColorDirective,
    CommonModule,
    ModalModule,
    ButtonDirective,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    PopoverModule,
    FormControlDirective,
    AutoCompleteModule
],
  templateUrl: './programme-fiche.component.html',
  styleUrl: './programme-fiche.component.scss'
})
export class ProgrammeFicheComponent implements OnInit{
  show:boolean=false;
  dateFrancais:string="";
  dataSource:CalendrierDispatch[]=[];
  calendrier :Calendrier|undefined;
  idCalendrier:number=8;
  form!: FormGroup; // Formulaire principal
  date!:string;
  filteredEnseignant: Enseignant[] = [];
  listeEnseignant: Enseignant[] = [];
  listeSalleBira: Salle[] = [];
  listeSalleTana: Salle[] = [];
  filteredSalle: Salle[] = [];

  constructor(private programmeService: ProgrammeService,
    private router: Router, 
    private route: ActivatedRoute,
    private loader: LoaderService,
    private formBuilder: FormBuilder,
    private enseignantservice: EnseignantService,
    private salleservice: SalleService,
    private concoursenseignantdispatchservice: ConcoursEnseignantDispatchService
  ){
      this.idCalendrier=parseInt(this.route.snapshot.queryParamMap.get('idCalendrier')!);
      this.getData();
     
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      rows: this.formBuilder.array([]) // FormArray contenant les lignes
    });

    this.getListeEnseignant();
    this.getListeSalle();
  }

  initializeForm() {
    this.rows.clear(); // Nettoyer l'ancien contenu

    this.dataSource.forEach(rowData => {
        this.rows.push(this.createRow(rowData));
    });
  }

  createRow(rowData: any): FormGroup {
    return this.formBuilder.group({
      idEnseignant: [rowData.idEnseignant || '', Validators.required],
      idSalle: [rowData.salle || '', Validators.required],
      urlVisio: [rowData.urlVisio || '', Validators.required],
      idCalendrierConcours: [rowData.idCalendrierConcours || ''],
      idPlageHoraire: [rowData.idPlageHoraire || ''],
      idCampus: [rowData.idCampus || ''],
      typePresentation: [rowData.typePresentation || ''],
      idConcoursEnseignantDispatch: [rowData.idConcoursEnseignantDispatch || ''],
    });
  }

  get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  getRowFormGroup(index: number): FormGroup {
    return this.rows.at(index) as FormGroup;
  }
  
  public getData(){
    this.loader.show();
    this.show=false;
    this.programmeService.getCalendrierConcoursDispatch(this.idCalendrier).subscribe(
      data=> {
        this.loader.hide();
        this.dataSource = data;
        this.setDate();
        this.initializeForm();
      },
      (error) => {
        this.loader.hide();
        var message = error.error.erreurs[0].messageErreur ;
        Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/concours/programme/liste']);  
          }
        });
      }  
    )
  }

  enregistrer() {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment valider cette inscription ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, valider',
      cancelButtonText: 'non, annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader.show();
        var tableau=this.form.value.rows;
        const concoursEnseignantDispatchList: ConcoursEnseignantDispatch[] =[];
        for(var enseignant of tableau){
          if(!enseignant.idConcoursEnseignantDispatch)
            concoursEnseignantDispatchList.push({
            idCalendrierConcours: enseignant.idCalendrierConcours,
            idPlageHoraire: enseignant.idPlageHoraire,
            idEnseignant: enseignant.idEnseignant?.idEnseignant ?? enseignant.idEnseignant,
            idCampus: enseignant.idCampus ? enseignant.idCampus : null,
            typePresentation: enseignant.typePresentation,
            idSalle: enseignant.idSalle ? enseignant.idSalle.idSalle ?? enseignant.idSalle : null,
            urlVisio: enseignant.idSalle ? null : enseignant.urlVisio
          })
        }
      
        console.log(concoursEnseignantDispatchList);

        this.concoursenseignantdispatchservice.insertConcoursEnseignantDispatch(concoursEnseignantDispatchList).subscribe(
          data => {
            this.loader.hide();

            if(data) {
              Swal.fire({
                title: '',
                text: data.message,
                icon: 'success',
              });

              this.getData();
            }
          },
          error => {
            this.loader.hide();
            Swal.fire({
              title: 'Erreur',
              text: error.error.erreurs[0].messageErreur,
              icon: 'error',
            });
          }
        )
      }
    });
  }

  getListeEnseignant() {
    this.enseignantservice.getListeEnseignant().subscribe(
      data => {
        if(data) {
          this.listeEnseignant = data;
        }
      }
    );
  }  

  searchEnseignant(event: any) {
    const query = event.query;

    // Filtrer les articles existants en fonction de la saisie
    this.filteredEnseignant = this.listeEnseignant.filter(enseignant =>
      enseignant.nomcomplet!.toLowerCase().includes(query.toLowerCase())
    );
  }

  searchSalleBira(event: any) {
    const query = event.query;

    // Filtrer les articles existants en fonction de la saisie
    this.filteredSalle = this.listeSalleBira.filter(enseignant =>
      enseignant.nom!.toLowerCase().includes(query.toLowerCase())
    );
  }  
  
  searchSalleTana(event: any) {
    const query = event.query;

    // Filtrer les articles existants en fonction de la saisie
    this.filteredSalle = this.listeSalleTana.filter(enseignant =>
      enseignant.nom!.toLowerCase().includes(query.toLowerCase())
    );
  }

  getListeSalle() {
    this.salleservice.getListeSalle(2).subscribe(
      data => {
        if(data) {
          this.listeSalleBira = data;
        }
      }
    );
    this.salleservice.getListeSalle(1).subscribe(
      data => {
        if(data) {
          this.listeSalleTana = data;
        }
      }
    )

  }

  regirigerAjouterDisponibilite(){
    this.router.navigate(['/enseignant/disponibilite'], { queryParams: { idCalendrier: this.idCalendrier } });
  }
  save(){
    console.log(this.form.value)
  }
  reset(){
    this.form.reset();
  }

  setDate(){
    if(this.dataSource.length!=0){
      this.date=Fonctions.formatedDateFormat(this.dataSource[0].dateConcoursEcrit);
    }
  }
}
