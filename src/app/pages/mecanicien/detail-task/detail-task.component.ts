import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CardBodyComponent, CardComponent ,
  ColComponent,
  RowComponent,
} from '@coreui/angular';
import { LocalStorageService } from '../../../services/local-storage.service';
import { MecanicienService } from '../../../services/mecanicien.service';
import { NgFor, NgStyle, NgIf, NgClass } from '@angular/common';
import { FormatCurrencyPipe } from '../../../validator/FormatCurrencyPipe';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-task',
  standalone: true,
  imports: [
    CardComponent, 
    CardBodyComponent,
    ColComponent,
    RowComponent,
    NgFor, NgStyle, NgIf, NgClass,
    FormatCurrencyPipe
  ],
  templateUrl: './detail-task.component.html',
  styleUrl: './detail-task.component.scss'
})
export class DetailTaskComponent implements OnChanges {

  listDetail: any = {};
  idrendezvous: string = '';
  @Input() idRdv: string = '';

  constructor (
    private mecanicienService: MecanicienService,
    private localStorageService : LocalStorageService,
    private route: ActivatedRoute,
  ) 
  {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idRdv']) {
      this.getDetail(changes['idRdv'].currentValue);
    }
  }

  getBadgeClass(avancement: number): string {
    switch (avancement) {
      case 1:
        return 'bg-warning'; // En attente (yellow)
      case 2:
        return 'bg-primary'; // En cours (blue)
      case 3:
        return 'bg-success'; // Terminé (green)
      default:
        return 'bg-secondary'; // Unknown state (gray)
    }
  }

  getBadgeLabel(avancement: number): string {
    switch (avancement) {
      case 1:
        return 'En attente';
      case 2:
        return 'En cours';
      case 3:
        return 'Terminé';
      default:
        return 'Inconnu';
    }
  }

  getDetail(idrendezvous: string) {
    this.mecanicienService.detailTache(idrendezvous).subscribe(
      (data: any)=> {
        this.listDetail = data;
      }
    )
  }


  avancer(idprestation: string) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Voulez-vous vraiment changer l'avancement de cette prestation ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, changer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Appeler le service si confirmé
        this.mecanicienService.avancement(this.idRdv, idprestation).subscribe(
          (response) => {
            Swal.fire({
              title: 'Succès',
              text: response?.message || 'Avancement mis à jour avec succès !',
              icon: 'success'
            });
            // this.getDetail(this.idRdv);
            const prestation = this.listDetail.prestations.find((p: { idprestation: string; }) => p.idprestation === idprestation);
            if (prestation) {
              prestation.avancement = response.nouveauAvancement ?? prestation.avancement + 1; // Utiliser la valeur du backend ou incrémenter
            }
          },
          (error) => {
            Swal.fire({
              title: 'Erreur',
              text: error?.error.message || 'Une erreur est survenue lors de la mise à jour.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
  


}
