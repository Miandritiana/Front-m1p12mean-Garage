import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  BadgeComponent, 
  ButtonCloseDirective,
  ButtonDirective, 
  CardBodyComponent, 
  CardComponent, 
  CardHeaderComponent, 
  ColComponent, 
  FormCheckComponent, 
  ModalBodyComponent, 
  ModalComponent, 
  ModalFooterComponent, 
  ModalHeaderComponent, 
  ModalTitleDirective, 
  RowComponent, 
  TableDirective, 
  TableColorDirective,
  ThemeDirective, 
  ModalModule,
  FormControlDirective,
  FormSelectDirective,
  AccordionComponent,
  AccordionItemComponent,
  TemplateIdDirective,
  AccordionButtonDirective,
  TooltipDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ConcoursService } from '../../../services/concours.service';
import { LoaderService } from '../../../services/loader.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage.service';
import { CaisseService } from '../../../services/caisse.service';
import { Caisse } from '../../../modele/Caisse';
import { HistoriqueEtatConcoursService } from '../../../services/historique-etat-concours.service';
import { Fonctions } from '../../../util/fonctions';
import { DossierConcoursDTO } from '../../../modele/DossierConcoursDTO';
import { DossierConcours } from '../../../modele/DossierConcours';
import { Constants } from 'src/app/util/constants';

@Component({
  selector: 'app-fiche',
  standalone: true,
  imports: [
    BadgeComponent,
    IconDirective,
    ButtonDirective,
    RowComponent, 
    ColComponent, CardComponent, 
    CardHeaderComponent, 
    CardBodyComponent,NgIf,
    ButtonCloseDirective,
    ButtonDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    FormCheckComponent,
    NgFor,
    NgIf,
    CommonModule,
    TableDirective,
    TableColorDirective,
    ThemeDirective,
    FormsModule,
    ModalModule,
    FormControlDirective,
    FormSelectDirective,
    AccordionComponent,
    AccordionItemComponent,
    TemplateIdDirective,
    AccordionButtonDirective,
    TooltipDirective
    ],
  templateUrl: './fiche.component.html',
  styleUrl: './fiche.component.scss'
})
export class FicheComponent {

  @ViewChild('verticallyCenteredModal') verticallyCenteredModal!: ModalComponent;
  idConcours:number=0;
  concours: DossierConcoursDTO|undefined;
  listeCaisse: Caisse[] = [];
  
  idCaisse: number | undefined = undefined;
  montant: number | 0 = 50000;
  numero: number | undefined = undefined;
  idTiers: number | undefined = undefined;
  idTypeTiers: number | undefined = undefined;

  historiqueConcours : any;

  ngOnInit() {
    this.getListeCaisse();
    this.getListeHistoriqueEtatConcours(this.idConcours);
  }
  
  constructor(private concoursService: ConcoursService,
      private router:Router,
      private activatedRoute: ActivatedRoute,
      private loader:LoaderService,
      private localStorageService : LocalStorageService,
      private caisseservice: CaisseService,
      private historiqueEtatConcours : HistoriqueEtatConcoursService
    ) {
    this.idConcours =parseInt( this.activatedRoute.snapshot.paramMap.get('id')!);
    this.idTiers = this.localStorageService.getIdUtilisateur();
    this.idTypeTiers = this.localStorageService.getIdUtilisateur();
    this.initData();
  }

  isValid(): boolean {
    return this.concours?.viewDossierConcours?.some((liste: any) => liste.etat === 1)!;
  }

  public verifierEtatConcours(dossierConcours: DossierConcours[]): boolean {
    for(let i=0; i<dossierConcours.length; i++) {
      if(dossierConcours[i].etat == 0) {
        return false;
      }
    }
    return true;
  }

  public valider(){
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

        
        let dossier: DossierConcours[] = this.concours!.viewDossierConcours.map(dossier => ({
          idDossierConcours: dossier.idDossierConcours,
          idTypeDossier: dossier.idTypeDossier,
          nomFichier: dossier.nomFichier,
          idConcours: dossier.idConcours,
          etat: dossier.etat
        }));

        console.log(dossier);
        
        this.concoursService.validerDE(this.idConcours, this.idTiers, dossier).subscribe(
          data => {
            this.loader.hide();
            if (data) {
              if(this.verifierEtatConcours(this.concours?.viewDossierConcours!)) {
                this.concours!.viewConcours.etat = 22;
              }
              else {
                this.concours!.viewConcours.etat = 21;
              }
              this.concours!.viewConcours.etatConcours = 'Validé DE';
              if (this.concours) {
                this.concours.viewDossierConcours = data.dossierConcours;
              }
              this.getListeHistoriqueEtatConcours(this.idConcours);
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
        );
      }
    });
  }

  validerRecouvrement() {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment valider cette inscription ?',
      icon: 'warning',
      showCancelButton: true, // Affiche le bouton "Annuler"
      cancelButtonText: 'Annuler', // Texte du bouton de refus
      confirmButtonText: 'Oui, valider'
    }).then((result) => {
      if (result.isConfirmed) {
        // Ajouter ici la logique pour valider l'inscription
        this.loader.show();
        this.concoursService.validerRecouvrement(this.idConcours, this.idTiers!, this.idTypeTiers!).subscribe(
          data=> {
            this.loader.hide();
            if(data) {
              this.initData();
              this.getListeHistoriqueEtatConcours(this.idConcours);
            }
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
        this.verticallyCenteredModal.visible = false;
      }
      // else if (result.dismiss === Swal.DismissReason.cancel) {
      //   // Si l'utilisateur annule
      //   this.verticallyCenteredModal.visible = false;
      //   console.log("Action annulée !");
      // }
    });
  }

  formatedDate(date: Date): string {
    return Fonctions.formatedDate(date, false).split('à')[0];
  }

  formatedHeure(heure: string): string {
    return Fonctions.formatedHeure(heure);
  }

  private initData(){
    this.concoursService.get(this.idConcours).subscribe(
      data=> {
        if(data) {
          this.concours = data;
        }
        else{
          Swal.fire({
            title: 'Pas de donne',
            text: 'Reference introuvable',
            icon: 'error',
            confirmButtonText: 'Retours a la liste'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/concours']);  
            }
          });
        }
      },
      error =>{
        this.loader.hide();
      }  
    )
  }

  getColorStatut(etat:number): string {
    return Fonctions.getColorStatut(etat);
  }

  openFichier(dossier:string) {
    window.open( Constants.BASE_URL_2 +"/files?filepath="+dossier ,
      dossier, // Nom de la fenêtre
        'width=600,height=800,left=200,top=100'
    )
  }

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  getListeCaisse() {
    this.caisseservice.getListeCaisse().subscribe(
      data => {
        if(data) {
          this.listeCaisse = data;
        }
      }
    )
  }

  getListeHistoriqueEtatConcours(idConcours: number) {
    this.historiqueEtatConcours.getHistoriqueConcours(idConcours).subscribe(
      data => {
        if (data) {
          this.historiqueConcours = data;
        }
      },
      error => {
        console.error('Erreur lors de la requête:', error);
      }
    );
  }

  onDossierChecked(idDossierConcours: number) {
    let dossier = this.concours?.viewDossierConcours.find(dossier => 
      dossier.idDossierConcours === idDossierConcours
    );
    if (dossier) {
      dossier.etat = 2;
    }
  }

  onDossierUnChecked(idDossierConcours: number) {
    let dossier = this.concours?.viewDossierConcours.find(dossier => 
      dossier.idDossierConcours === idDossierConcours
    );
    if (dossier) {
      dossier.etat = 0;
    }
  }
}
