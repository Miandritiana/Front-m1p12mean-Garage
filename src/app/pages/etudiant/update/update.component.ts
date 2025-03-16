import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormDirective, FormLabelDirective, ModalModule,FormControlDirective,InputGroupComponent, InputGroupTextDirective, FormSelectDirective,  } from '@coreui/angular';
import { EtudiantService } from '../../../services/etudiant.service';
import { Manifestation } from '../../../modele/Manifestation';
import { ManifestationService } from '../../../services/manifestation.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Personne } from '../../../modele/Personne';
import { NiveauTypeFormation } from '../../../modele/NiveauTypeFormation';
import { Ville } from '../../../modele/Ville';
import { Message } from '../../../modele/message';
import { Etablissement } from '../../../modele/Etablissement';
import { LoaderService } from '../../../services/loader.service';
import { VilleService } from '../../../services/ville.service';
import { TypeFormationService } from '../../../services/type-formation.service';
import { NiveauService } from '../../../services/niveau.service';
import { EtablissementService } from '../../../services/etablissement.service';
import { Fonctions } from '../../../util/fonctions';
import { ParcoursService } from '../../../services/parcours.service';
import { Parcours } from '../../../modele/Parcours';
import { dateRangeValidator } from '../../../validator/anneeNaissanceValidator';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    ModalModule,
    ButtonDirective,
    ButtonCloseDirective,
    ReactiveFormsModule, 
    FormsModule, 
    FormLabelDirective, 
    FormControlDirective,
    InputGroupComponent, InputGroupTextDirective,
    NgIf,
    NgFor,
    AutoCompleteModule,
    FormSelectDirective
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent  implements OnChanges,OnInit {

  @Output() close: EventEmitter<boolean> = new EventEmitter();  // Output event to emit data to parent
  @Output() openMessage: EventEmitter<boolean> = new EventEmitter();  // Output event to emit data to parent
  @Output() message: EventEmitter<Message> = new EventEmitter();
  @Input() showUpdate:boolean=false;
  @Input() manifestation: Manifestation | undefined;
  newManifestation: Manifestation = new Manifestation();
  idManifestation:number=0
  messages: string="";
  personne: Personne = new Personne();
  listeNiveau: NiveauTypeFormation[] = [];
  listeVille: Ville[] = [];
  filteredVille: Ville[] = [];
  ville: Ville | null = null;
  listeEtablissement: Etablissement[] = [];
  filteredEtablissement: Etablissement[] = [];
  etablissement: Etablissement | null = null;
  form: FormGroup = new FormGroup({});
  listeParcours: Parcours[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private etudiantService:EtudiantService,
    private manifestationservice: ManifestationService,
    private loader: LoaderService,
    private villeservice: VilleService,
    private niveauservice: NiveauService,
    private etablissementservice: EtablissementService,
    private parcoursservice: ParcoursService,
  ) {
    this.getListeVille();
    this.getListeEtablissement();
    this.getListeNiveau();
  }
  ngOnInit(): void {
    this.form = this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      contact: [
        '',
        [
          Validators.required,
          Validators.pattern(/^03[2-9]\s\d{2}\s\d{3}\s\d{2}$/)
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      dateNaissance:['',[Validators.required,dateRangeValidator]],
      ville: ['', Validators.required],
      etablissement: ['', Validators.required],
      niveau: [''],
      parcours: ['']
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['manifestation']) {
      this.idManifestation=this.manifestation?.idManifestation!;
      this.resetForme();
    }
  }

  public isRequired(name: string): boolean {
    const control = this.form.get(name);
    return !!(control && control?.errors?.["required"] && (control.dirty || control.touched));
  }

  public dateNaissanceInvalide():boolean{
    const control = this.form.get('dateNaissance');
    return !!(this.form.get('dateNaissance') && control && (control?.errors?.['invalidDate'] || control?.errors?.['outOfRange']));
  }

  public resetForme(){
    const villeSelectionnee = this.listeVille.find(
      ville => ville.idVille === this.manifestation!.idVille
    );
    const EtablissementSelectionnee = this.listeEtablissement.find(
      etablissement => etablissement.idEtablissement === this.manifestation!.idEtablissement
    );
    const niveauSelectionnee = this.manifestation?.idNiveau;
    this.form= this.formBuilder.group({
      nom: [this.manifestation!.nom, Validators.required],
      prenom: [this.manifestation!.prenom, Validators.required],
      contact: [this.manifestation!.contact, [Validators.required,Validators.pattern(/^03[2-9]\s\d{2}\s\d{3}\s\d{2}$/)]],
      email: [this.manifestation!.email, [Validators.required,Validators.email]],
      dateNaissance: [this.manifestation!.dateNaissance, [Validators.required,Validators.required]],
      ville: [villeSelectionnee, Validators.required],
      etablissement: [EtablissementSelectionnee, Validators.required],
      niveau: [niveauSelectionnee],
      parcours:[this.manifestation?.idParcours]
    });
    this.getListeParcours();
  }

  update(){
    if(this.form.valid){
      this.loader.show();
      if(this.form.value.ville !== null && this.ville !== null && this.filteredVille.length === 0) {
        this.villeservice.insertVille(this.ville).subscribe(
          data => {
            this.ville = data;
            this.form.patchValue({ ville: this.ville });

            if(this.form.value.etablissement !== null && this.etablissement !== null && this.filteredEtablissement.length === 0) {
              this.etablissementservice.insertEtablissement(this.etablissement).subscribe(
                data => {
                  this.etablissement = data;
                  this.form.patchValue({ etablissement: data });
                }
              );
            }

            this.enregistrer();
          }
        );
      }

      if(this.form.value.etablissement !== null && this.etablissement !== null && this.filteredEtablissement.length === 0) {
        this.etablissementservice.insertEtablissement(this.etablissement).subscribe(
          data => {
            this.etablissement = data;
            this.form.patchValue({ etablissement: data });

            this.enregistrer();
          }
        );
      }

      this.enregistrer();
    }
  }

  enregistrer(){      
    this.personne.idPersonne = this.manifestation!.idPersonne;
    this.personne.nom = this.form.value.nom;
    this.personne.prenom = this.form.value.prenom;
    this.personne.dateNaissance = this.form.value.dateNaissance;
    this.personne.contact = this.form.value.contact;
    this.personne.email = this.form.value.email;
    this.personne.idVille = this.form.value.ville.idVille;
    this.personne.typePersonne = 3;

    this.newManifestation.idManifestation = this.manifestation!.idManifestation;
    this.newManifestation.idPersonne = this.manifestation!.idPersonne;
    this.newManifestation.idVille = this.form.value.ville.idVille;
    this.newManifestation.idEtablissement = this.form.value.etablissement.idEtablissement;
    this.newManifestation.dateManifestation = this.manifestation!.dateManifestation;
    this.newManifestation.idNiveau = this.form.value.niveau;
    this.newManifestation.idParcours=this.form.value.parcours;
    this.manifestationservice.updateManifestation(this.personne, this.newManifestation!).subscribe(
      (response) => {
        this.loader.hide();
        this.form.reset();
        this.close.emit(true);
        this.openMessage.emit(true);
        this.message.emit({
            message:"Les informations sur l’étudiant(e) ont été bien modifiées",
            type:1
          })
        this.toggleLiveDemo();

        
      },
      ()=>{
        this.loader.hide();
      }
    );
  }
  
  getListeParcours() {
    if(!this.form.value.parcours) {
      this.listeParcours = [];
      this.form.patchValue({
        parcours: '' // Remet la valeur vide pour réafficher le placeholder
      });
    }
    if(this.form.value.niveau){
      this.parcoursservice.getListeParcours(this.form.value.niveau).subscribe(
        data => {
          this.listeParcours = data;
        }
      );
    }
    
  }

  toggleLiveDemo() {
    this.showUpdate = !this.showUpdate;
    this.close.emit(this.showUpdate);
  }
  
  handleLiveDemoChange(event: any) {
    this.showUpdate = event;
  }
  
  getListeVille() {
    this.villeservice.getListeVille().subscribe(
      data => {
        this.listeVille = data;
      }
    )
  }

  getListeEtablissement() {
    this.etablissementservice.getListeEtablissement().subscribe(
      data => {
        this.listeEtablissement = data;
      }
    )
  }

  getListeNiveau() {
    this.form.patchValue({
      niveau: '' // Remet la valeur vide pour réafficher le placeholder
    });
    this.niveauservice.getListeNiveau(0).subscribe(
      data => {
        this.listeNiveau = data;
      }
    )
  }

  searchVille(event: any) {
    const query = event.query;
    
    // Stocker la saisie de l'utilisateur
    this.ville = new Ville();
    this.ville.nomVille = query;

    // Filtrer les articles existants en fonction de la saisie
    this.filteredVille = this.listeVille.filter(ville =>
      ville.nomVille.toLowerCase().includes(query.toLowerCase())
    );
  }

  search(event: any) {
    const query = event.query;
    
    // Stocker la saisie de l'utilisateur
    this.etablissement = new Etablissement();
    this.etablissement.nomEtablissement = query;

    // Filtrer les articles existants en fonction de la saisie
    this.filteredEtablissement = this.listeEtablissement.filter(etablissement =>
      etablissement.nomEtablissement.toLowerCase().includes(query.toLowerCase())
    );

  }

  getVilleSelected(ville: any) {
    this.ville = new Ville();
    this.ville = ville.value;
  }

  getEtablissementSelected(etablissement: any) {
    this.etablissement = new Etablissement();
    this.etablissement = etablissement.value;
  }

  formatedDateManifestation(date: Date): string {
    return Fonctions.formatedDateFormat(date);
  }
}
