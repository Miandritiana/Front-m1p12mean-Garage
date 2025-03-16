import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, ColComponent, FormCheckComponent, FormControlDirective, FormSelectDirective, RowComponent, RowDirective } from '@coreui/angular';
import { Engagement } from 'src/app/modele/Engagement';
import { EngagementService } from 'src/app/services/engagement.service';
import { ParentService } from 'src/app/services/parent.service';
import { InscriptionService } from 'src/app/services/inscription.service';
import { TypeParent } from 'src/app/modele/TypeParent';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription-definitive',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    FormControlDirective,
    FormSelectDirective,
    ButtonDirective,
    FormCheckComponent,
    NgFor,
    NgIf,
    FormsModule
  ],
  templateUrl: './inscription-definitive.component.html',
  styleUrl: './inscription-definitive.component.scss'
})
export class InscriptionDefinitiveComponent implements OnInit {

  idConcours: number = 0;
  listeEngagement: Engagement[] = [];
  listeTypeParent: TypeParent[] = [];
  dateNaissance: Date | null = null;
  lieuNaissance: string | null = null;
  paysOrigine: string | null = null;
  nationalite: string | null = null;
  adresse: string | null = null;
  genre: string | null = null;
  engagement: string | null = null;
  typeParent: string | null = null;
  nom: string | null = null;
  prenom: string | null = null;
  profession: string | null = null;
  email: string | null = null;
  telephone: string | null = null;
  message: string | null = null;
  objet: any | null = null;
  
  constructor(private route: ActivatedRoute, private engagementservice: EngagementService,
    private parentservice: ParentService, private inscriptionservice: InscriptionService, 
    private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idConcours = +params.get('idConcours')!; // Convertir en number
    });

    this.getListeEngagement();
    this.getListeTypeParent();
  }

  getListeEngagement() {
    this.engagementservice.getListeEngagement().subscribe(
      data=> {
        if(data) {
          this.listeEngagement = data;
        }
      }
    )
  }

  getListeTypeParent() {
    this.parentservice.getListeTypeParent().subscribe(
      data=> {
        if(data) {
          this.listeTypeParent = data;
        }
      }
    )
  }

  inscriptionDefinitive() {
    console.log(this.dateNaissance);
    console.log(this.lieuNaissance);
    console.log(this.paysOrigine);
    console.log(this.nationalite);
    console.log(this.adresse);
    console.log(this.genre);
    console.log(this.engagement);
    console.log(this.typeParent);
    console.log(this.nom);
    console.log(this.prenom);
    console.log(this.profession);
    console.log(this.email);
    console.log(this.telephone);

    const formData = new FormData();

    if (this.idConcours !== 0) {
      formData.append('idConcours', this.idConcours.toString());
    }
    if (this.engagement !== null) {
      formData.append('idEngagement', this.engagement);
    }
    if (this.nom !== null) {
      formData.append('nom', this.nom);
    }
    if (this.prenom !== null) {
      formData.append('prenom', this.prenom);
    }
    if (this.telephone !== null) {
      formData.append('telephone', this.telephone);
    }
    if (this.email !== null) {
      formData.append('email', this.email);
    }
    if (this.profession !== null) {
      formData.append('profession', this.profession);
    }
    if (this.typeParent !== null) {
      formData.append('idTypeParent', this.typeParent);
    }
    if (this.dateNaissance !== null && typeof this.dateNaissance === 'string') {
      const dateObject = new Date(this.dateNaissance);
      if (!isNaN(dateObject.getTime())) { // Vérifiez que la date est valide
        formData.append('dateNaissance', dateObject.toISOString().split('T')[0]);
      } else {
        console.error('Invalid date format:', this.dateNaissance);
      }
    }
    if (this.lieuNaissance !== null) {
      formData.append('lieuNaissance', this.lieuNaissance);
    }
    if (this.paysOrigine !== null) {
      formData.append('paysOrigine', this.paysOrigine);
    }
    if (this.nationalite !== null) {
      formData.append('nationalite', this.nationalite);
    }
    if (this.adresse !== null) {
      formData.append('adresse', this.adresse);
    }
    if (this.genre !== null) {
      formData.append('genre', this.genre);
    }

    this.inscriptionservice.inscriptionDefinitive(formData).subscribe(
      data=> {
        if(data) {
          this.message = data.message;
          this.objet = data.objet;

          this.router.navigate(['/resultat/liste-admis']);
        }
      }
    )
  }
  
}
