import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonDirective, ColComponent, FormControlDirective, RowComponent, TableColorDirective, TableDirective } from '@coreui/angular';
import { FraisScolarite } from '../../../modele/FraisScolarite';
import { NiveauTypeFormation } from '../../../modele/NiveauTypeFormation';
import { FraisScolariteService } from '../../../services/frais-scolarite.service';
import { NiveauTypeFormationService } from '../../../services/niveau-type-formation.service';

@Component({
  selector: 'app-ajouter',
  standalone: true,
  imports: [
    NgFor,
    FormControlDirective,
    RowComponent,
    ColComponent,
    ButtonDirective,
    FormsModule
  ],
  templateUrl: './ajouter.component.html',
  styleUrl: './ajouter.component.scss'
})
export class AjouterComponent implements OnInit {

  idAnneeScolaire: number | undefined = undefined;
  anneeScolaire: string | null = null;
  listeNiveauTypeFormation: NiveauTypeFormation[] = [];
  fraisScolarite: FraisScolarite[] = [];

  constructor(private activatedroute: ActivatedRoute,
    private router: Router,
    private niveautypeformationservice: NiveauTypeFormationService,
    private fraisscolariteservice: FraisScolariteService) {}

  ngOnInit(): void {
    // Récupérer le paramètre `idAnneeScolaire` depuis l'URL
    this.activatedroute.paramMap.subscribe(params => {
      const id = params.get('idAnneeScolaire');
      this.idAnneeScolaire = id ? parseInt(id, 10) : undefined;
      this.anneeScolaire = params.get('anneeScolaire') || '';
    });

    this.getListeNiveauTypeFormation();
  }

  getListeNiveauTypeFormation() {
    this.niveautypeformationservice.getListeNiveauTypeFormation().subscribe(
      data => {
        if(data) {
          // Ajoute un champ `montant` vide à chaque élément
          this.listeNiveauTypeFormation = data.map(item => ({
            ...item,
            montant: undefined  // Initialisation vide
          }));
        }
      }
    )
  }

  enregistrerMontants(): void {
    this.listeNiveauTypeFormation.forEach(valeurs => {
      if (valeurs.montant != undefined) { // Vérifie que montant n'est ni null ni undefined
        this.fraisScolarite.push({
          idAnneeScolaire: this.idAnneeScolaire!,
          idNiveauTypeFormation: valeurs.idNiveauTypeFormation,
          montant: valeurs.montant!
        });
      }
    });

    this.fraisscolariteservice.insertionFraisScolarite(this.fraisScolarite).subscribe(
      data => {
        this.router.navigate(['/frais-scolarite/liste']);
      }
    )
  }

}
