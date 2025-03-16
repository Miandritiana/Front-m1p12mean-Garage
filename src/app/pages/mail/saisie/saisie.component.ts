import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormDirective, FormLabelDirective, ModalModule,FormControlDirective,InputGroupComponent, InputGroupTextDirective,  } from '@coreui/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { TemplateMail } from '../../../modele/templateMail';
import { TemplateMailService } from '../../../services/template-mail.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-saisie',
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
  templateUrl: './saisie.component.html',
  styleUrl: './saisie.component.scss'
})
export class SaisieComponent implements OnChanges {

  @Input() showSaisie: boolean = false;
  @Input() selectedCorpsMail: TemplateMail|undefined;
  @Output() updatedData= new EventEmitter<TemplateMail>();
  idPat: number |undefined;

  editorForm: FormGroup;

  @ViewChild('editor') editor!: EditorComponent;

  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
    height:500,
    resize: false,
    menubar: false,
    language: 'fr_FR',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
  };

  constructor(private fb: FormBuilder,
    private templateEmailService:TemplateMailService,
    private localStorageService : LocalStorageService
  ) {
    this.editorForm = this.fb.group({
      corps: [''],
      objet: ['']
    });
    this.idPat = this.localStorageService.getIdUtilisateur();
  }

  ngOnInit() {
    if (this.selectedCorpsMail) {
      this.editorForm.patchValue({
        corps: this.selectedCorpsMail.corps,
        objet:this.selectedCorpsMail.objet
      });
    }
  }

  toggleLiveDemo() {
    this.showSaisie = !this.showSaisie;
  }

  backToList() {
    this.showSaisie = false;
  }

  save(){
    const data = {
      corps: this.editorForm.value.corps,
      objet: this.editorForm.value.objet,
      idTemplateMail: this.selectedCorpsMail?.idTemplateMail,
      idPat : this.idPat
    }

    this.templateEmailService.insert(data).subscribe(
      data=> {
        this.updatedData.emit(data);
        this.backToList();
        this.showSaisie = false;
      },  
    )
  }

  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['selectedCorpsMail']) {
        this.resetForme();
      }
    }

     public resetForme(){
        this.editorForm.patchValue({
          corps: this.selectedCorpsMail?.corps,
          objet: this.selectedCorpsMail?.objet
        });
    }

}
