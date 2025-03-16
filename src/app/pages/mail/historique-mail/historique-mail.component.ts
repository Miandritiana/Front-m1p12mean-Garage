import { Component } from '@angular/core';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, TableDirective, TableColorDirective, DropdownModule, PopoverModule} from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TruncateHtmlPipe } from '../../calendrier/liste/truncate-html.pipe';
import { ButtonCloseDirective, ButtonDirective, FormDirective, FormLabelDirective, ModalModule,FormControlDirective,InputGroupComponent, InputGroupTextDirective } from '@coreui/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HistoriqueApercuComponent } from '../historique-apercu/historique-apercu.component';
import { TemplateMail } from '../../../modele/templateMail';
import { TemplateMailService } from '../../../services/template-mail.service';

@Component({
  selector: 'app-historique-mail',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    TableDirective,
    TableColorDirective,
    DropdownModule,
    PopoverModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HistoriqueApercuComponent,
    TruncateHtmlPipe,
    ButtonCloseDirective,
    ButtonDirective,
    FormDirective,
    FormLabelDirective,
    ModalModule,
    FormControlDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    RouterModule,
    TruncateHtmlPipe
  ],
  templateUrl: './historique-mail.component.html',
  styleUrl: './historique-mail.component.scss'
})
export class HistoriqueMailComponent {

  historiquemails = [
    { dateSaisie: '01-01-2024', idPat: 'admin', corps: 'Vous avez inscrit au concours. Cordialement' },
    { dateSaisie: '01-01-2023', idPat: 'admin', corps: 'On vous rappelle pour l\'inscription definitive parcque vous avez eu une note suffisante' },
  ];

  idTemplateMail: number | undefined;
  description: string | undefined;
  indexSelected=0;
  showHistoApercu = false;
  historiqueMails: any[] = [];
  totalPages: number | undefined = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  selectedMail: any;
  objet: string = '';
  corps: string = '';
  idTemplateMailEnvoye : string = '';

  constructor(private route: ActivatedRoute, private router: Router, private templateMail : TemplateMailService ) {}

  ngOnInit(): void {
    // Access the queryParams directly
    this.route.queryParams.subscribe(params => {
      this.idTemplateMail = params['idTemplateMail'];
      this.description = params['description'];
    });
    this.loadHistorique();
  }

  apercuHisto(histomail: any): void {
    // Set the data for modal and show it
    this.objet = histomail.objet; // Assuming idTemplateMail is in idPat
    this.corps = histomail.corps;
    this.idTemplateMailEnvoye = histomail.idHistoriqueCorpsMail.toString();

    this.showHistoApercu = false;
    setTimeout(() => {
      this.showHistoApercu = true;
    });
  }

  loadHistorique(): void {
    this.templateMail.getAllHistoriqueCorpsMails(this.currentPage, this.pageSize, this.idTemplateMail).subscribe(
      data => {
        this.historiqueMails = data.content;
        this.totalPages = data.totalPages;
      }
    );
  }

  concatNiveau(nomType: string, nomNiveau: string): string {
    return `${nomType}/${nomNiveau}`;
  }

}
