import { Component } from '@angular/core';
import { RendezVousValideComponent } from '../rendez-vous-valide/rendez-vous-valide.component';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

    constructor (
      private localStorageService : LocalStorageService,
      private router: Router,
    ) 
    {}

      ngOnInit(): void {
        const userRole = this.localStorageService.getLoginInfo()?.role ?? '';
    
        if (userRole != '3') {
          Swal.fire({
            icon: 'error',
            title: 'Accès refusé',
            text: 'Vous n\'avez pas accès à cette page.',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/login']);
          });
        }
        
      }

}
