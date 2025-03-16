import { Component } from '@angular/core';
import { BadgeComponent, CardBodyComponent, CardFooterComponent, CardComponent, ColComponent, DropdownModule, FormCheckComponent, FormControlDirective, FormSelectDirective, ModalModule, PageItemDirective, PageLinkDirective, PaginationComponent, PopoverModule, RowComponent, TableColorDirective, TableDirective, TextColorDirective } from '@coreui/angular';
import { SeuilNoteService } from '../../../services/seuil-note.service';
import { CommonModule } from '@angular/common';
import { ButtonDirective, ButtonCloseDirective } from '@coreui/angular';
import { LoaderService } from '../../../services/loader.service';
import { AdmissionService } from '../../../services/admission.service';

@Component({
  selector: 'app-admission-automatique',
  standalone: true,
  imports: [
    CardBodyComponent,
    CardComponent,
    ColComponent,
    DropdownModule,
    ModalModule,
    PopoverModule,
    RowComponent,
    TextColorDirective,
    CommonModule,
    CardFooterComponent,
    ButtonDirective,
  ],
  templateUrl: './admission-automatique.component.html',
  styleUrl: './admission-automatique.component.scss'
})
export class AdmissionAutomatiqueComponent {

  seuilnotes: any;

  constructor(private seuilNoteService: SeuilNoteService,private loader:LoaderService,
    private admissionService :AdmissionService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  nbEtudiantAdmisNiveau = [
    {niveau: 'Licence 1', nbEtudiant: 50},
    {niveau: 'Licence 2', nbEtudiant: 12},
    {niveau: 'Licence 3', nbEtudiant: 20},
    {niveau: 'Master 1', nbEtudiant: 10},
    {niveau: 'Master 2', nbEtudiant: 14},
  ];

  getData(){
    this.loader.show();
    this.seuilNoteService.getAll().subscribe(
      data=> {
      this.loader.hide();
        if(data) {
          this.seuilnotes=data;
          }
        },
      error =>{
        this.loader.hide();
      }  
    );
  }
}
