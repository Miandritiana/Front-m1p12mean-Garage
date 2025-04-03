import { Component, OnInit } from '@angular/core';

import { ListTaskComponent } from '../list-task/list-task.component';
import { DetailTaskComponent } from '../detail-task/detail-task.component';


import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mecanicien',
  standalone: true,
  imports: [
    ListTaskComponent,
    DetailTaskComponent
  ],
  templateUrl: './mecanicien.component.html',
  styleUrl: './mecanicien.component.scss'
})
export class MecanicienComponent implements OnInit {

      constructor(
        private router: Router, 
        private localStorageService: LocalStorageService
      ) { }

  idRdv: string = '';

  receiveIdRdv(data: string) {
    this.idRdv = data;
  }

  
    ngOnInit(): void {
      const userRole = this.localStorageService.getLoginInfo()?.role ?? '';
  
      if (userRole != '2') {
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
