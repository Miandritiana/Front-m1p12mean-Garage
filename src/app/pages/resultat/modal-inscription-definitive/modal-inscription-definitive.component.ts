import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonDirective, ColComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, GutterDirective, InputGroupComponent, InputGroupTextDirective, RowComponent, ButtonCloseDirective, ModalModule } from '@coreui/angular';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { NgFor, NgIf } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-modal-inscription-definitive',
  standalone: true,
  imports: [
    EditorModule,
    ButtonDirective,
    FormsModule,
    ReactiveFormsModule,
    FormLabelDirective, 
    FormControlDirective,
    RowComponent,ColComponent,
    FormSelectDirective,
    NgFor,
    IconDirective,
    ModalModule,
    ButtonDirective,
    ButtonCloseDirective,
    ReactiveFormsModule, 
    FormsModule, 
    FormLabelDirective, 
    FormControlDirective,
    InputGroupComponent, InputGroupTextDirective,
    NgIf
  ],
  templateUrl: './modal-inscription-definitive.component.html',
  styleUrl: './modal-inscription-definitive.component.scss'
})
export class ModalInscriptionDefinitiveComponent {
  form: FormGroup;
  messages: string="";

  constructor(
    private formBuilder: FormBuilder,
    private loader:LoaderService,
    private router: Router
  ){
    this.form = this.formBuilder.group({
      dateConcours: ['', Validators.required]
    });
  }
  @Input() showModalInscriDef:boolean=false;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  save(){
    if(this.form.status==='VALID'){
      this.loader.show();
    }
  }
  
  toggleLiveDemo() {
    this.showModalInscriDef = !this.showModalInscriDef;
  }
}
