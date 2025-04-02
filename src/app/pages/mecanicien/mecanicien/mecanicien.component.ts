import { Component } from '@angular/core';

import { ListTaskComponent } from '../list-task/list-task.component';
import { DetailTaskComponent } from '../detail-task/detail-task.component';

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
export class MecanicienComponent {

}
