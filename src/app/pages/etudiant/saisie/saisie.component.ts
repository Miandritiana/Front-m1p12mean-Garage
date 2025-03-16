import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormDirective, FormLabelDirective, ModalModule,FormControlDirective,InputGroupComponent, InputGroupTextDirective, FormSelectDirective,  } from '@coreui/angular';
import { LoaderService } from '../../../services/loader.service';
import { VilleService } from '../../../services/ville.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Ville } from '../../../modele/Ville';
import { NiveauService } from '../../../services/niveau.service';
import { NiveauTypeFormation } from '../../../modele/NiveauTypeFormation';
import { EtablissementService } from '../../../services/etablissement.service';
import { Etablissement } from '../../../modele/Etablissement';
import { ManifestationService } from '../../../services/manifestation.service';
import { Personne } from '../../../modele/Personne';
import { Manifestation } from '../../../modele/Manifestation';
import { ParcoursService } from '../../../services/parcours.service';
import { Parcours } from '../../../modele/Parcours';
import { dateRangeValidator } from '../../../validator/anneeNaissanceValidator';
import { Message } from '../../../modele/message';

@Component({
  selector: 'app-saisie',
  standalone: true,
  imports: [ModalModule,
    ButtonDirective,
    ButtonCloseDirective,
    ReactiveFormsModule, 
    FormsModule, 
    FormLabelDirective, 
    FormControlDirective,
    InputGroupComponent, 
    InputGroupTextDirective,
    NgIf,
    NgFor,
    AutoCompleteModule,
    FormSelectDirective
  ],
  templateUrl: './saisie.component.html',
  styleUrl: './saisie.component.scss'
})
export class SaisieComponent implements OnInit{
  
  personne: Personne = new Personne();
  manifestation: Manifestation = new Manifestation();
  listeParcours: Parcours[] = [];
  listeNiveau: NiveauTypeFormation[] = [];
  listeVille: Ville[] = [];
  filteredVille: Ville[] = [];
  ville: Ville = new Ville();
  listeEtablissement: Etablissement[] = [];
  filteredEtablissement: Etablissement[] = [];
  etablissement: Etablissement = new Etablissement();
  form: FormGroup = new FormGroup({}); 
  @Output() close: EventEmitter<boolean> = new EventEmitter();  // Output event to emit data to parent
  @Output() openMessage: EventEmitter<boolean> = new EventEmitter();  // Output event to emit data to parent
  @Output() message: EventEmitter<Message> = new EventEmitter();
  @Input() showSaisie:boolean=false;
  
  constructor(
    private formBuilder: FormBuilder,
    private loader:LoaderService,
    private villeservice: VilleService,
    private parcoursservice: ParcoursService,
    private niveauservice: NiveauService,
    private etablissementservice: EtablissementService,
    private manifestationservice: ManifestationService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
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

    this.getListeEtablissement();
    this.getListeVille();
    this.getListeNiveau();
    this.majuscule();
  }

  public isRequired(name: string): boolean {
    const control = this.form.get(name);
    return !!(control && control?.errors?.["required"] && (control.dirty || control.touched));
  }

    public dateNaissanceInvalide():boolean{
    const control = this.form.get('dateNaissance');
    return !!(this.form.get('dateNaissance') && control && (control?.errors?.['invalidDate'] || control?.errors?.['outOfRange']));
  }
  

  toggleLiveDemo() {
    this.showSaisie = !this.showSaisie;
  }

  handleLiveDemoChange(event: any) {
    this.showSaisie = event;
  }

  resetForme() {
    this.listeNiveau = [];
    this.form.reset({
      niveau: '' // Remet la valeur vide pour réafficher le placeholder
    });
  }

  save() {
    if(this.form.valid){
      this.loader.show();
      if(this.ville.nomVille !== '' && this.filteredVille.length === 0) {
        this.villeservice.insertVille(this.ville).subscribe(
          data => {
            this.ville = data;
            this.form.patchValue({ ville: this.ville });

            if(this.etablissement.nomEtablissement !== null && this.filteredEtablissement.length === 0) {
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

      if(this.etablissement.nomEtablissement !== null && this.filteredEtablissement.length === 0) {
        this.etablissementservice.insertEtablissement(this.etablissement).subscribe(
          data => {
            this.etablissement = data;
            this.form.patchValue({ etablissement: data });

            
            this.enregistrer();
          }
        );
      }

      else {
        this.enregistrer();
      }
    }
    
  }

  enregistrer(){
    this.personne.nom = this.form.value.nom;
        this.personne.prenom = this.form.value.prenom;
        this.personne.dateNaissance = this.form.value.dateNaissance;
        this.personne.contact = this.form.value.contact;
        this.personne.email = this.form.value.email;
        this.personne.idVille = this.form.value.ville.idVille;
        this.personne.typePersonne = 3;
  
        this.manifestation.idVille = this.form.value.ville.idVille;
        this.manifestation.idEtablissement = this.form.value.etablissement.idEtablissement;
        this.manifestation.idNiveau = this.form.value.niveau;
        this.manifestation.idParcours = this.form.value.parcours;
  
        this.manifestationservice.insertManifestation(this.personne, this.manifestation).subscribe(
          data => {
            this.loader.hide();
            this.form.reset();
            this.close.emit(true);
            this.openMessage.emit(true);
            this.message.emit({
                message:"Les informations sur l’étudiant(e) ont été bien enregistrées avec succès",
                type:1
              })
            this.toggleLiveDemo();
          }
        );
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
    this.niveauservice.getListeNiveau(0).subscribe(
      data => {
        this.listeNiveau = data;
      }
    )
  }

  getListeParcours() {
    this.parcoursservice.getListeParcours(this.form.value.niveau).subscribe(
      data => {
        this.listeParcours = data;
      }
    );
  }

  searchVille(event: any) {
    const query = event.query;
    
    // Stocker la saisie de l'utilisateur
    this.ville.nomVille = query;

    // Filtrer les articles existants en fonction de la saisie
    this.filteredVille = this.listeVille.filter(ville =>
      ville.nomVille.toLowerCase().includes(query.toLowerCase())
    );
  }

  search(event: any) {
    const query = event.query;
    
    // Stocker la saisie de l'utilisateur
    this.etablissement.nomEtablissement = query;

    // Filtrer les articles existants en fonction de la saisie
    this.filteredEtablissement = this.listeEtablissement.filter(etablissement =>
      etablissement.nomEtablissement.toLowerCase().includes(query.toLowerCase())
    );

  }

  getVilleSelected(ville: any) {
    this.ville = ville.value;
  }

  getEtablissementSelected(etablissement: any) {
    this.etablissement = etablissement.value;
  }

  public majuscule(){
    this.form.get('nom')?.valueChanges.subscribe((value) => {
      if (value) {
        this.form
          .get('nom')
          ?.setValue(this.capitalize(value), { emitEvent: false });
      }
    });
    this.form.get('prenom')?.valueChanges.subscribe((value) => {
      if (value) {
        this.form
          .get('prenom')
          ?.setValue(this.capitalize(value), { emitEvent: false });
      }
    });
  }

  capitalize(value: string): string {
    return value.replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
