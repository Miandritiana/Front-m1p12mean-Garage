import { Component } from '@angular/core';
import { FraisScolariteService } from '../../../services/frais-scolarite.service';
import { ViewFraisScolarite } from '../../../modele/ViewFraisScolarite';
import { HttpStatusCode } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { ButtonCloseDirective, ButtonDirective, ButtonModule, CardBodyComponent, CardComponent, ColComponent, DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, FormControlDirective, FormSelectDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, PageItemDirective, PageLinkDirective, PaginationComponent, RowComponent, TableColorDirective, TableDirective, TextColorDirective, ThemeDirective, TooltipDirective } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { IconComponent, IconDirective } from '@coreui/icons-angular';
import { CalendarModule } from 'primeng/calendar';
import { NiveauTypeFormation } from '../../../modele/NiveauTypeFormation';
import { NiveauTypeFormationService } from '../../../services/niveau-type-formation.service';
import { AnneeScolaireService } from '../../../services/annee-scolaire.service';
import { FraisScolarite } from '../../../modele/FraisScolarite';
import { AnneeScolaire } from '../../../modele/AnneeScolaire';
import { FraisScolariteData } from '../../../modele/FraisScolariteData';
import { ChipModule  } from 'primeng/chip';
import { TypeFormation } from '../../../modele/TypeFormation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormControlDirective,
    CalendarModule,
    ButtonModule,
    TableDirective,
    TableColorDirective,
    FormsModule,
    RowComponent, 
    ColComponent, 
    TextColorDirective, 
    CardComponent, 
    CardBodyComponent, 
    FormSelectDirective,
    IconComponent,
    IconDirective,
    TooltipDirective,
    ChipModule,
    ButtonCloseDirective,
    ButtonDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective
  ],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.scss'
})
export class ListeComponent {

  listeFraisScolarite : FraisScolariteData[] = [];
  messageNoContent : string | null = null;
  niveauFormation : string | null = null;
  idAnneeScolaire : number = 0;
  listeNiveauTypeFormation : NiveauTypeFormation[] = [];
  listeAnneeScolaire :any;
  niveau : string | null = null;

  fraisScolarite: FraisScolarite[] = [];
  showButtonUpdate: boolean = false;
  anneescolaire: AnneeScolaire = new AnneeScolaire();
  typeFormation : TypeFormation[] = [];
  typeFormationSelectionne: string = '';
  anneeScolaireString: string = '';
  listeNiveauParCursus : any;
  public visible = false;
  lastAnneeScolaire : string = '';

  constructor(private fraisScolariteService : FraisScolariteService, private niveauTypeFormation : NiveauTypeFormationService,
    private anneeScolaire : AnneeScolaireService
  ) {}

  ngOnInit(): void {
    console.log("Valeur initiale de showButtonUpdate:", this.showButtonUpdate);
    this.showButtonUpdate = false;
    this.getListeFrais();
    //this.chargerNiveauxFormation();
    this.chargerAnneeScolaire();
    this.chargerTypeFormation();
    this.getLastAnneeScolaire();
  }

  getListeFrais() {
    this.listeFraisScolarite = [];
    this.messageNoContent = null;
    var parametre = '';

    if(this.idAnneeScolaire !== 0) {
      this.idAnneeScolaire = this.idAnneeScolaire;
      parametre += '?idAnneeScolaire=' + this.idAnneeScolaire;
      if(this.niveauFormation !== null) {
        parametre += '&niveauFormation=' + this.niveauFormation;
      }
      this.fraisScolariteService.listeFraisScolarite(parametre).subscribe(
        data=> {
          if(data) {
            this.listeFraisScolarite = data.map(item => ({
              ...item,
              montantInitial: item.montant  // Initialisation vide
            }));
          }
        }
      )
    }
    else {
      this.anneeScolaire.getAnneeScolaireEnCours().subscribe(
        data => {
          if(data) {
            this.idAnneeScolaire = data.idAnneeScolaire;
            parametre += '?idAnneeScolaire=' + this.idAnneeScolaire;
            if(this.niveauFormation !== null) {
              parametre += '&niveauFormation=' + this.niveauFormation;
            }
            if(this.niveau !== null) {
              parametre += '&niveau=' + this.niveau;
            }
            this.fraisScolariteService.listeFraisScolarite(parametre).subscribe(
              data=> {
                if(data) {
                  this.listeFraisScolarite = data.map(item => ({
                    ...item,
                    montantInitial: item.montant  // Initialisation vide
                  }));
                }
              }
            )
          }
        }
      )
    }
  }

  chargerNiveauxFormation(): void {
    this.niveauTypeFormation.getListeNiveauTypeFormation().subscribe(
      (data) => {
        this.listeNiveauTypeFormation = data;
      }
    );
  }

  concatNiveau(nomType: string, nomNiveau: string): string {
    return `${nomType}/${nomNiveau}`;
  }

  chargerAnneeScolaire(): void {
    this.anneeScolaire.listeAnneeScolaire().subscribe(
      (data) => {
        this.listeAnneeScolaire = data;
      }
    );
  }

  insertionMontant() {
    this.showButtonUpdate = true;
  }

  annuler() {
    this.showButtonUpdate = false;
  }

  enregistrerMontants(): void {
    this.listeFraisScolarite.forEach(valeurs => {
      if (valeurs.montant != valeurs.montantInitial) { // Vérifie que montant n'est ni null ni undefined
        this.fraisScolarite.push({
          idAnneeScolaire: this.idAnneeScolaire!,
          idNiveauTypeFormation: valeurs.idNiveauTypeFormation,
          montant: valeurs.montant!
        });
      }
    });

    this.fraisScolariteService.insertionFraisScolarite(this.fraisScolarite).subscribe(
      data => {
        this.showButtonUpdate = false;
      }
    )
  }

  onNiveauChange(event: any) {
    if (!event.value) {
      // Si la sélection est effacée (null), on réinitialise la valeur à une chaîne vide
      this.niveauFormation = null;
      this.getListeFrais();
    }
  }

  formatMontant(value: number): string {
    if (value === null || value === undefined) {
      return '';
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  chargerTypeFormation(): void {
    this.niveauTypeFormation.getTypeFromation().subscribe(
      (data) => {
        this.typeFormation = data;
      }
    );
  }
  
  onTypeFormationChange(): void {
    if (this.niveauFormation) {
      this.niveauTypeFormation.getListeNiveauParCursus(this.niveauFormation).subscribe(
        (data) => {
          this.listeNiveauParCursus = data;
        },
        (error) => {
          console.error("Erreur lors de la récupération des niveaux :", error);
          this.listeNiveauParCursus = []; 
        }
      );
    } else {
      this.listeNiveauParCursus = []; 
    }
  }

  ajouterAnneeScolaire(): void {
    if (this.anneeScolaireString.trim()) {
      this.anneeScolaire.insertionAnneeScolaire(this.anneeScolaireString).subscribe(
        (response) => {
          console.log('Réponse du serveur :', response);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Année scolaire ajoutée avec succès !',
            confirmButtonColor: '#3085d6'
          });
          this.toggleLiveDemo();
        },
        
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Attention',
        text: 'Veuillez entrer une année scolaire.',
        confirmButtonColor: '#ffc107'
      });
    }
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  getLastAnneeScolaire(): void {
    this.anneeScolaire.getLastAnneeScolaire().subscribe(
      (data) => {
        this.lastAnneeScolaire = data;
        console.log("aaaaaaa:", this.lastAnneeScolaire);
      }
    );
  }

}
