import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormDirective, FormLabelDirective, ModalModule,FormControlDirective,InputGroupComponent, InputGroupTextDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { Router } from '@angular/router';
import { TemplateMailService } from '../../../services/template-mail.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-historique-apercu',
  standalone: true,
  imports: [
    ButtonCloseDirective,
    ButtonDirective,
    ModalModule,
    ReactiveFormsModule,
    CommonModule,
    EditorModule,
    FormControlDirective,
    InputGroupComponent,
    InputGroupTextDirective
  ],
  templateUrl: './historique-apercu.component.html',
  styleUrl: './historique-apercu.component.scss'
})
export class HistoriqueApercuComponent {

  @Input() showHistoApercu: boolean = false;
  @Input() objet: string = '';
  @Input() corps: string = '';
  @Input() idTempalteMailEnvoye = '';
  idPat: number |undefined;
  idTemplateMail : string = '';
  corpsConcatene : string = '';

  constructor(private router: Router, private templateMail : TemplateMailService, private localStorageService : LocalStorageService) {
    this.idPat = this.localStorageService.getIdUtilisateur();
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();

    // Check if state is passed during navigation
    if (navigation?.extras.state) {
      this.objet = navigation.extras.state['objet'];
      this.corps = navigation.extras.state['description'];
      this.idTempalteMailEnvoye = navigation.extras.state['idTemplateMailEnvoye'];

      

      // To see the values in the console
      console.log('description:', this.corps);
    } else {
      console.warn('No state data found!');
    }
  }

  toggleLiveDemo() {
    this.showHistoApercu = !this.showHistoApercu;
  }

  backToList() {
    this.showHistoApercu = false;
  }

  restaurer() {
    this.templateMail.restaurerMail(parseInt(this.idTempalteMailEnvoye), this.idPat).subscribe({
      next: (response) => {
        console.log('Mail restauré avec succès !', response);
        this.showHistoApercu = false;
      },
      error: (error) => {
        console.error('Erreur lors de la restauration du mail', error);
      }
    });
  }
}
