import { Component } from '@angular/core';
import { RendezVousValideComponent } from '../rendez-vous-valide/rendez-vous-valide.component';

@Component({
  selector: 'app-histo-prestation',
  standalone: true,
  imports: [
    RendezVousValideComponent
  ],
  templateUrl: './histo-prestation.component.html',
  styleUrl: './histo-prestation.component.scss'
})
export class HistoPrestationComponent {

}
