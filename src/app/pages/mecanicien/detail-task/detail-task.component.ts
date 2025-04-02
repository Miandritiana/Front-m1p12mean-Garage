import { Component, Input, OnInit } from '@angular/core';
import { CardBodyComponent, CardComponent ,
  ColComponent,
  RowComponent,
} from '@coreui/angular';
import { LocalStorageService } from '../../../services/local-storage.service';
import { MecanicienService } from '../../../services/mecanicien.service';
import { NgFor, NgStyle, NgIf, NgClass } from '@angular/common';
import { FormatCurrencyPipe } from '../../../validator/FormatCurrencyPipe';
import { ActivatedRoute } from '@angular/router';

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
export class DetailTaskComponent implements OnInit {

  listDetail: any[] = [];

  constructor (
    private mecanicienService: MecanicienService,
    private localStorageService : LocalStorageService,
    private route: ActivatedRoute,
  ) 
  {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idrendezvous = params.get('idrendezvous');
      if (idrendezvous) {
        this.getDetail(idrendezvous);
      }
    });
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
      (data: any[])=> {
        this.listDetail = data;
      }
    )
  }


}
